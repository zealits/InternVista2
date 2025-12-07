import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";

import { Config } from "@/server/config/schema";
import { EmailTemplatesService } from "./email-templates.service";

/**
 * Mail Service
 * Handles sending emails via SMTP with proper error handling
 */
@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly mailerService: MailerService,
    private readonly emailTemplates: EmailTemplatesService,
  ) {}

  /**
   * Check if SMTP is properly configured
   */
  private isSmtpConfigured(): boolean {
    const smtpMail = this.configService.get("SMTP_MAIL");
    const smtpPassword = this.configService.get("SMTP_PASSWORD");
    const smtpService = this.configService.get("SMTP_SERVICE");

    console.log("[MailService] isSmtpConfigured - Checking config:");
    console.log("  SMTP_SERVICE:", smtpService || "not set");
    console.log("  SMTP_MAIL:", smtpMail || "not set");
    console.log("  SMTP_PASSWORD:", smtpPassword ? "***" : "not set");

    // Check if SMTP_SERVICE is configured (doesn't need host/port)
    if (smtpService && smtpMail && smtpPassword) {
      console.log("[MailService] SMTP configured via SMTP_SERVICE");
      return true;
    }

    // Check if individual SMTP config is set and not localhost (needs host/port)
    const smtpHost = this.configService.get("SMTP_HOST");
    const smtpPort = this.configService.get("SMTP_PORT");
    
    console.log("  SMTP_HOST:", smtpHost || "not set");
    console.log("  SMTP_PORT:", smtpPort || "not set");
    
    if (smtpHost && smtpPort && smtpMail && smtpPassword) {
      const isLocalhost = 
        smtpHost === "localhost" || 
        smtpHost === "127.0.0.1" || 
        smtpHost === "::1" ||
        smtpHost.startsWith("127.");
      
      if (isLocalhost) {
        console.log("[MailService] SMTP_HOST is localhost - NOT configured");
        return false; // Localhost hosts are not valid SMTP configurations
      }
      console.log("[MailService] SMTP configured via individual config (host/port)");
      return true;
    }

    console.log("[MailService] SMTP NOT configured - missing required fields");
    return false;
  }

  /**
   * Send email with HTML and text support
   */
  async sendEmail(options: ISendMailOptions) {
    console.log("[MailService] sendEmail called");
    console.log("  To:", options.to);
    console.log("  Subject:", options.subject);
    
    const isConfigured = this.isSmtpConfigured();
    console.log("[MailService] isSmtpConfigured result:", isConfigured);
    
    // Check the actual transport being used - try different ways to access it
    const mailerService = this.mailerService as any;
    console.log("[MailService] MailerService structure:", {
      hasTransporter: !!mailerService?.transporter,
      hasTransport: !!mailerService?.transport,
      keys: Object.keys(mailerService || {})
    });
    
    let transportOptions: any = {};
    const transporter = mailerService?.transporter || mailerService?.transport;
    if (transporter) {
      // Try different ways to access nodemailer transport options
      // Nodemailer stores options in different places depending on transport type
      const directOptions = transporter.options;
      const nestedOptions = transporter.transporter?.options;
      const smtpOptions = (transporter as any).smtp?.options;
      
      transportOptions = directOptions || nestedOptions || smtpOptions || {};
      
      // Also try to get from the actual nodemailer transport
      if (transporter.transporter) {
        const nodemailerTransport = transporter.transporter;
        transportOptions = {
          ...transportOptions,
          host: nodemailerTransport.options?.host || 
                nodemailerTransport.hostname || 
                nodemailerTransport.host ||
                transportOptions.host ||
                "N/A",
          port: nodemailerTransport.options?.port || 
                nodemailerTransport.port || 
                transportOptions.port ||
                "N/A",
          secure: nodemailerTransport.options?.secure !== undefined ? 
                  nodemailerTransport.options.secure : 
                  (nodemailerTransport.secure !== undefined ? nodemailerTransport.secure : transportOptions.secure),
          service: nodemailerTransport.options?.service || 
                   nodemailerTransport.service || 
                   transportOptions.service ||
                   "N/A",
        };
      }
      
      // If we still don't have host, try to get it from the connection
      if (!transportOptions.host || transportOptions.host === "N/A") {
        const connection = (transporter as any).connection || (transporter as any).socket;
        if (connection) {
          transportOptions.host = connection.hostname || connection.host || transportOptions.host || "N/A";
          transportOptions.port = connection.port || transportOptions.port || "N/A";
        }
      }
    }
    
    console.log("[MailService] Current transport config:", {
      host: transportOptions.host || "N/A",
      port: transportOptions.port || "N/A",
      secure: transportOptions.secure !== undefined ? transportOptions.secure : "N/A",
      service: transportOptions.service || "N/A",
      auth: transportOptions.auth ? { user: transportOptions.auth.user || "N/A", hasPass: !!transportOptions.auth.pass } : "N/A"
    });
    
    // Warn if we detect localhost configuration
    if (transportOptions.host && transportOptions.host !== "N/A" && 
        (transportOptions.host === "localhost" || transportOptions.host === "127.0.0.1" || transportOptions.host.startsWith("127."))) {
      Logger.warn(
        `WARNING: Transport is configured with localhost (${transportOptions.host}:${transportOptions.port}). This will fail!`,
        "MailService#sendEmail",
      );
    }
    
    try {
      console.log("[MailService] Attempting to send email via mailerService...");
      const result = await this.mailerService.sendMail(options);
      console.log("[MailService] Email sent successfully:", result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log("[MailService] Error sending email:", errorMessage);
      console.log("[MailService] Full error:", error);
      
      // Check for connection errors (ECONNREFUSED, ETIMEDOUT, etc.)
      if (errorMessage.includes("ECONNREFUSED") || errorMessage.includes("ETIMEDOUT")) {
        Logger.warn(
          `SMTP connection failed for ${options.to}: ${errorMessage}. Falling back to console logging. To fix this, either: 1) Remove SMTP configuration to use console logging, or 2) Configure a proper SMTP server (e.g., Gmail, SendGrid, etc.)`,
          "MailService#sendEmail",
        );
        // Log the email content as fallback
        const bodyPreview = options.text || 
          (typeof options.html === 'string' ? options.html.substring(0, 100) : 
           options.html instanceof Buffer ? options.html.toString('utf8').substring(0, 100) : 
           "N/A");
        Logger.log(
          `[Email would be sent] To: ${options.to}, Subject: ${options.subject}, Body: ${bodyPreview}`,
          "MailService#sendEmail",
        );
        // Return a mock response instead of throwing to prevent breaking the flow
        return {
          messageId: "mock-message-id",
          accepted: [options.to],
          rejected: [],
          pending: [],
          response: "Email logged (SMTP connection failed)",
        };
      } else {
        Logger.error(
          `Failed to send email to ${options.to}: ${errorMessage}`,
          "MailService#sendEmail",
        );
      }
      throw error;
    }
  }

  /**
   * Send verification email with HTML template
   */
  async sendVerificationEmail(email: string, name: string, verificationToken: string): Promise<void> {
    const template = this.emailTemplates.getVerificationEmailTemplate(name, email, verificationToken);

    await this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  /**
   * Send welcome email with HTML template
   */
  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const template = this.emailTemplates.getWelcomeEmailTemplate(name, email);

    await this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }
}
