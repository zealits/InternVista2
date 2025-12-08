import { HttpService } from "@nestjs/axios";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import fontkit from "@pdf-lib/fontkit";
import { ResumeDto } from "@reactive-resume/dto";
import { getFontUrls } from "@reactive-resume/utils";
import { ErrorMessage } from "@reactive-resume/utils";
import retry from "async-retry";
import { PDFDocument } from "pdf-lib";
import { connect, launch, Browser, Page } from "puppeteer";
import * as fs from "fs";
import * as path from "path";

import { Config } from "../config/schema";
import { StorageService } from "../storage/storage.service";
import { UtilsService } from "../utils/utils.service";

@Injectable()
export class PrinterService {
  private readonly logger = new Logger(PrinterService.name);

  private browserURL: string | null = null;
  private browserExecutablePath: string | null = null;
  private useDirectLaunch: boolean;

  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly storageService: StorageService,
    private readonly httpService: HttpService,
    private readonly utils: UtilsService,
  ) {
    // Check if BROWSER_EXECUTABLE_PATH is set (preferred method)
    let executablePath = this.configService.get<string>("BROWSER_EXECUTABLE_PATH");
    
    if (executablePath) {
      this.browserExecutablePath = executablePath;
      this.useDirectLaunch = true;
      this.logger.log(`Using direct Chrome launch with executable: ${executablePath}`);
    } else {
      // Try to auto-detect Chrome on Windows
      const detectedPath = this.detectChromePath();
      if (detectedPath) {
        this.browserExecutablePath = detectedPath;
        this.useDirectLaunch = true;
        this.logger.log(`Auto-detected Chrome at: ${detectedPath}`);
      } else {
        // Fall back to remote Chrome connection (backward compatibility)
        const chromeUrl = this.configService.get<string>("CHROME_URL");
        const chromeToken = this.configService.get<string>("CHROME_TOKEN");
        
        if (!chromeUrl || !chromeToken) {
          this.logger.error(
            "Browser configuration error: Either BROWSER_EXECUTABLE_PATH or both CHROME_URL and CHROME_TOKEN must be configured. " +
            "On Windows, Chrome is typically located at: C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe or " +
            "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
          );
          throw new Error(
            "Either BROWSER_EXECUTABLE_PATH or both CHROME_URL and CHROME_TOKEN must be configured",
          );
        }
        
        this.browserURL = `${chromeUrl}?token=${chromeToken}`;
        this.useDirectLaunch = false;
        this.logger.log(`Using remote Chrome connection: ${chromeUrl}`);
      }
    }
  }

  /**
   * Attempts to detect Chrome installation path on Windows
   */
  private detectChromePath(): string | null {
    if (process.platform !== "win32") {
      return null;
    }

    const possiblePaths = [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      path.join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
      path.join(process.env.PROGRAMFILES || "", "Google", "Chrome", "Application", "chrome.exe"),
      path.join(process.env["PROGRAMFILES(X86)"] || "", "Google", "Chrome", "Application", "chrome.exe"),
    ];

    for (const chromePath of possiblePaths) {
      if (fs.existsSync(chromePath)) {
        return chromePath;
      }
    }

    return null;
  }

  private async getBrowser() {
    try {
      if (this.useDirectLaunch && this.browserExecutablePath) {
        // Launch Chrome directly using executable path
        this.logger.debug(`Attempting to launch Chrome from: ${this.browserExecutablePath}`);
        
        // Platform-specific Chrome launch arguments
        const baseArgs = [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
        ];
        
        // Linux-specific flags (not needed on Windows/Mac)
        if (process.platform === "linux") {
          baseArgs.push("--disable-setuid-sandbox", "--single-process", "--no-zygote");
        }
        
        return await launch({
          executablePath: this.browserExecutablePath,
          headless: 'new',
          args: baseArgs,
        });
      } else if (this.browserURL) {
        // Connect to remote Chrome instance
        this.logger.debug(`Attempting to connect to Chrome at: ${this.browserURL}`);
        return await connect({ browserWSEndpoint: this.browserURL });
      } else {
        throw new Error("Browser configuration is invalid. Either BROWSER_EXECUTABLE_PATH or both CHROME_URL and CHROME_TOKEN must be configured");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to get browser: ${errorMessage}`, error instanceof Error ? error.stack : undefined);
      throw new InternalServerErrorException(
        ErrorMessage.InvalidBrowserConnection,
        `Failed to connect to browser: ${errorMessage}. Please check your browser configuration.`
      );
    }
  }

  async getVersion() {
    const browser = await this.getBrowser();
    const version = await browser.version();
    // Use close() for launched browsers, disconnect() for connected browsers
    if (this.useDirectLaunch) {
      await browser.close();
    } else {
      browser.disconnect();
    }
    return version;
  }

  async printResume(resume: ResumeDto) {
    return this.utils.getCachedOrSet(
      `user:${resume.userId}:storage:resumes:${resume.id}`,
      async () => {
        const start = performance.now();

        const url = await retry(() => this.generateResume(resume), {
          retries: 3,
          randomize: true,
          onRetry: (_, attempt) => {
            this.logger.log(`Retrying to print resume #${resume.id}, attempt #${attempt}`);
          },
        });

        const duration = Number(performance.now() - start).toFixed(0);
        const numPages = resume.data.metadata.layout.length;

        this.logger.debug(`Chrome took ${duration}ms to print ${numPages} page(s)`);

        return url;
      },
    );
  }

  async printPreview(resume: ResumeDto) {
    return this.utils.getCachedOrSet(
      `user:${resume.userId}:storage:previews:${resume.id}`,
      async () => {
        const start = performance.now();

        const url = await retry(() => this.generatePreview(resume), {
          retries: 3,
          randomize: true,
          onRetry: (_, attempt) => {
            this.logger.log(
              `Retrying to generate preview of resume #${resume.id}, attempt #${attempt}`,
            );
          },
        });

        const duration = Number(performance.now() - start).toFixed(0);

        this.logger.debug(`Chrome took ${duration}ms to generate preview`);

        return url;
      },
    );
  }

  async generateResume(resume: ResumeDto) {
    let browser: Browser | undefined;
    let page: Page | undefined;
    try {
      browser = await this.getBrowser();
      page = await browser.newPage();

      // Set timeouts to prevent hanging
      page.setDefaultNavigationTimeout(60000); // 60 seconds
      page.setDefaultTimeout(60000);

      // Add error handlers to detect page/browser closure
      page.on("error", (error) => {
        this.logger.error(`Page error: ${error.message}`);
      });

      page.on("close", () => {
        this.logger.warn("Page was closed unexpectedly");
      });

      browser.on("disconnected", () => {
        this.logger.warn("Browser was disconnected unexpectedly");
      });

      let url = this.utils.getUrl();
      const publicUrl = this.configService.getOrThrow<string>("PUBLIC_URL");
      const storageUrl = this.configService.getOrThrow<string>("STORAGE_URL");

      // Only replace localhost with host.docker.internal if browser is running in Docker (remote Chrome)
      // When using direct launch (browser on same machine), keep localhost as-is
      if (!this.useDirectLaunch && [publicUrl, storageUrl].some((url) => url.includes("localhost"))) {
        // Switch client URL from `localhost` to `host.docker.internal` in development
        // This is required because the browser is running in a container and the client is running on the host machine.
        url = url.replace("localhost", "host.docker.internal");

        await page.setRequestInterception(true);

        // Intercept requests of `localhost` to `host.docker.internal` in development
        page.on("request", (request) => {
          if (request.url().startsWith(storageUrl)) {
            const modifiedUrl = request.url().replace("localhost", `host.docker.internal`);

            request.continue({ url: modifiedUrl });
          } else {
            request.continue();
          }
        });
      }

      // Set the data of the resume to be printed in the browser's session storage
      const numPages = resume.data.metadata.layout.length;

      await page.evaluateOnNewDocument((data) => {
        window.localStorage.setItem("resume", JSON.stringify(data));
      }, resume.data);

      // Use a more reliable waitUntil option with timeout
      // Try networkidle0 first, but fallback to load if it times out
      try {
        await page.goto(`${url}/artboard/preview`, {
          waitUntil: "networkidle0",
          timeout: 60000,
        });
      } catch (navigationError) {
        this.logger.warn(
          `Navigation with networkidle0 failed, retrying with load: ${navigationError.message}`,
        );
        // Fallback to 'load' which is more reliable
        await page.goto(`${url}/artboard/preview`, {
          waitUntil: "load",
          timeout: 60000,
        });
        // Wait a bit for any remaining network activity
        await page.waitForTimeout(2000);
      }

      if (!page) {
        throw new Error("Page is not initialized");
      }

      const pagesBuffer: Buffer[] = [];

      const processPage = async (pageInstance: Page, index: number) => {
        const pageElement = await pageInstance.$(`[data-page="${index}"]`);
        const width = (await (await pageElement?.getProperty("scrollWidth"))?.jsonValue()) ?? 0;
        const height = (await (await pageElement?.getProperty("scrollHeight"))?.jsonValue()) ?? 0;

        const tempHtml = await pageInstance.evaluate((element: HTMLDivElement) => {
          const clonedElement = element.cloneNode(true) as HTMLDivElement;
          const tempHtml = document.body.innerHTML;
          document.body.innerHTML = `${clonedElement.outerHTML}`;
          return tempHtml;
        }, pageElement);

        pagesBuffer.push(await pageInstance.pdf({ width, height, printBackground: true }));

        await pageInstance.evaluate((tempHtml: string) => {
          document.body.innerHTML = tempHtml;
        }, tempHtml);
      };

      // Loop through all the pages and print them, by first displaying them, printing the PDF and then hiding them back
      for (let index = 1; index <= numPages; index++) {
        await processPage(page, index);
      }

      // Using 'pdf-lib', merge all the pages from their buffers into a single PDF
      const pdf = await PDFDocument.create();
      pdf.registerFontkit(fontkit);

      // Get information about fonts used in the resume from the metadata
      const fontData = resume.data.metadata.typography.font;
      const fontUrls = getFontUrls(fontData.family, fontData.variants);

      // Load all the fonts from the URLs using HttpService
      const responses = await Promise.all(
        fontUrls.map((url) =>
          this.httpService.axiosRef.get(url, {
            responseType: "arraybuffer",
          }),
        ),
      );
      const fontsBuffer = responses.map((response) => response.data as ArrayBuffer);

      // Embed all the fonts in the PDF
      await Promise.all(fontsBuffer.map((buffer) => pdf.embedFont(buffer)));

      for (let index = 0; index < pagesBuffer.length; index++) {
        const pdfPage = await PDFDocument.load(new Uint8Array(pagesBuffer[index]));
        const [copiedPage] = await pdf.copyPages(pdfPage, [0]);
        pdf.addPage(copiedPage);
      }

      // Save the PDF to storage and return the URL to download the resume
      // Store the URL in cache for future requests, under the previously generated hash digest
      const buffer = Buffer.from(await pdf.save());

      // This step will also save the resume URL in cache
      const resumeUrl = await this.storageService.uploadObject(
        resume.userId,
        "resumes",
        buffer,
        resume.id,
      );

      // Close all the pages and disconnect/close the browser
      await page.close();
      if (this.useDirectLaunch) {
        await browser.close();
      } else {
        browser.disconnect();
      }

      return resumeUrl;
    } catch (error) {
      this.logger.error(`Error generating resume: ${error.message}`, error.stack);
      
      // Ensure cleanup even on error
      try {
        if (page && !page.isClosed()) {
          await page.close();
        }
      } catch (closeError) {
        this.logger.warn(`Error closing page: ${closeError.message}`);
      }
      
      try {
        if (browser) {
          if (this.useDirectLaunch) {
            // For launched browsers, just close (isConnected() may not work the same way)
            await browser.close();
          } else {
            // For connected browsers, check connection before disconnecting
            if (browser.isConnected()) {
              browser.disconnect();
            }
          }
        }
      } catch (disconnectError) {
        this.logger.warn(`Error closing/disconnecting browser: ${disconnectError.message}`);
      }
      
      // Re-throw the error so retry mechanism can work
      throw error;
    }
  }

  async generatePreview(resume: ResumeDto) {
    let browser: Browser | undefined;
    let page: Page | undefined;
    try {
      browser = await this.getBrowser();
      page = await browser.newPage();

      // Set timeouts to prevent hanging
      page.setDefaultNavigationTimeout(60000); // 60 seconds
      page.setDefaultTimeout(60000);

      // Add error handlers to detect page/browser closure
      page.on("error", (error) => {
        this.logger.error(`Page error: ${error.message}`);
      });

      page.on("close", () => {
        this.logger.warn("Page was closed unexpectedly");
      });

      browser.on("disconnected", () => {
        this.logger.warn("Browser was disconnected unexpectedly");
      });

      let url = this.utils.getUrl();
      const publicUrl = this.configService.getOrThrow<string>("PUBLIC_URL");
      const storageUrl = this.configService.getOrThrow<string>("STORAGE_URL");

      // Only replace localhost with host.docker.internal if browser is running in Docker (remote Chrome)
      // When using direct launch (browser on same machine), keep localhost as-is
      if (!this.useDirectLaunch && [publicUrl, storageUrl].some((url) => url.includes("localhost"))) {
        // Switch client URL from `localhost` to `host.docker.internal` in development
        // This is required because the browser is running in a container and the client is running on the host machine.
        url = url.replace("localhost", "host.docker.internal");

        await page.setRequestInterception(true);

        // Intercept requests of `localhost` to `host.docker.internal` in development
        page.on("request", (request) => {
          if (request.url().startsWith(storageUrl)) {
            const modifiedUrl = request.url().replace("localhost", `host.docker.internal`);

            request.continue({ url: modifiedUrl });
          } else {
            request.continue();
          }
        });
      }

      // Set the data of the resume to be printed in the browser's session storage
      await page.evaluateOnNewDocument((data) => {
        window.localStorage.setItem("resume", JSON.stringify(data));
      }, resume.data);

      await page.setViewport({ width: 794, height: 1123 });

      // Use a more reliable waitUntil option with timeout
      // Try networkidle0 first, but fallback to load if it times out
      try {
        await page.goto(`${url}/artboard/preview`, {
          waitUntil: "networkidle0",
          timeout: 60000,
        });
      } catch (navigationError) {
        this.logger.warn(
          `Navigation with networkidle0 failed, retrying with load: ${navigationError.message}`,
        );
        // Fallback to 'load' which is more reliable
        await page.goto(`${url}/artboard/preview`, {
          waitUntil: "load",
          timeout: 60000,
        });
        // Wait a bit for any remaining network activity
        await page.waitForTimeout(2000);
      }

      // Save the JPEG to storage and return the URL
      // Store the URL in cache for future requests, under the previously generated hash digest
      const buffer = await page.screenshot({ quality: 80, type: "jpeg" });

      // Generate a hash digest of the resume data, this hash will be used to check if the resume has been updated
      const previewUrl = await this.storageService.uploadObject(
        resume.userId,
        "previews",
        buffer,
        resume.id,
      );

      // Close all the pages and disconnect/close the browser
      await page.close();
      if (this.useDirectLaunch) {
        await browser.close();
      } else {
        browser.disconnect();
      }

      return previewUrl;
    } catch (error) {
      this.logger.error(`Error generating preview: ${error.message}`, error.stack);
      
      // Ensure cleanup even on error
      try {
        if (page && !page.isClosed()) {
          await page.close();
        }
      } catch (closeError) {
        this.logger.warn(`Error closing page: ${closeError.message}`);
      }
      
      try {
        if (browser) {
          if (this.useDirectLaunch) {
            // For launched browsers, just close (isConnected() may not work the same way)
            await browser.close();
          } else {
            // For connected browsers, check connection before disconnecting
            if (browser.isConnected()) {
              browser.disconnect();
            }
          }
        }
      } catch (disconnectError) {
        this.logger.warn(`Error closing/disconnecting browser: ${disconnectError.message}`);
      }
      
      // Re-throw the error so retry mechanism can work
      throw error;
    }
  }
}
