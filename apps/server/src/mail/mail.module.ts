import { Logger, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import * as nodemailer from "nodemailer";

import { Config } from "@/server/config/schema";

import { MailService } from "./mail.service";
import { EmailTemplatesService } from "./email-templates.service";

// Create a mock transporter that logs instead of sending
const emptyTransporter = nodemailer.createTransport({
  jsonTransport: true, // This makes it log instead of actually sending
});

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => {
        console.log("[MailModule] ===== INITIALIZING MAIL MODULE =====");
        // Hardcode Gmail SMTP settings to ensure they're always used
        const smtpHost = configService.get("SMTP_HOST") || "smtp.gmail.com";
        const smtpPort = configService.get("SMTP_PORT") || 465;
        const smtpMail = configService.get("SMTP_MAIL");
        const smtpPassword = configService.get("SMTP_PASSWORD");
        const smtpService = configService.get("SMTP_SERVICE");
        
        // Force use of Gmail SMTP if SMTP_SERVICE is gmail
        const finalHost = smtpService === "gmail" ? "smtp.gmail.com" : smtpHost;
        const finalPort = smtpService === "gmail" ? 465 : smtpPort;

        console.log("[MailModule] Raw config values:");
        console.log("  SMTP_HOST:", smtpHost || "not set");
        console.log("  SMTP_PORT:", smtpPort || "not set");
        console.log("  SMTP_MAIL:", smtpMail || "not set");
        console.log("  SMTP_PASSWORD:", smtpPassword ? "***" : "not set");
        console.log("  SMTP_SERVICE:", smtpService || "not set");

        // Debug logging to verify configuration - always log to help diagnose issues
        Logger.log(
          `SMTP Config Check - Host: ${smtpHost || "not set"}, Port: ${smtpPort || "not set"}, Mail: ${smtpMail ? "***" : "not set"}, Password: ${smtpPassword ? "***" : "not set"}, Service: ${smtpService || "not set"}`,
          "MailModule",
        );

        let transport: nodemailer.Transporter | any;

        // PRIORITY 1: If SMTP_SERVICE is "gmail", always use Gmail SMTP configuration
        if (smtpService === "gmail" && smtpMail && smtpPassword) {
          console.log("[MailModule] Gmail service detected - using explicit smtp.gmail.com:465");
          const transportConfig: any = {
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: smtpMail,
              pass: smtpPassword,
            },
            tls: {
              rejectUnauthorized: false,
            },
          };
          
          console.log("[MailModule] Transport config:", {
            host: transportConfig.host,
            port: transportConfig.port,
            secure: transportConfig.secure,
            user: transportConfig.auth.user,
            hasPassword: !!transportConfig.auth.pass
          });
          
          Logger.log(
            `Creating Gmail SMTP transport: Host: smtp.gmail.com, Port: 465, Secure: true, User: ${smtpMail}`,
            "MailModule",
          );
          
          // Pass the transport config directly to MailerModule instead of pre-creating
          // This ensures MailerModule uses our configuration
          transport = transportConfig;
          
          console.log("[MailModule] Transport config passed directly to MailerModule");
          
          // Verify the transport configuration
          console.log("[MailModule] Transport config being passed:", {
            host: transport.host || "N/A",
            port: transport.port || "N/A",
            secure: transport.secure !== undefined ? transport.secure : "N/A",
            hasAuth: !!transport.auth
          });
        }
        // PRIORITY 2: Use individual SMTP configuration (host/port) if provided
        else if (finalHost && finalPort && smtpMail && smtpPassword) {
          console.log("[MailModule] Using individual SMTP config");
          console.log("  Host:", finalHost);
          console.log("  Port:", finalPort);
          console.log("  Mail:", smtpMail);
          
          // Check if SMTP_HOST is localhost/127.0.0.1 - this usually means misconfiguration
          const isLocalhost = 
            finalHost === "localhost" || 
            finalHost === "127.0.0.1" || 
            finalHost === "::1" ||
            finalHost.startsWith("127.");

          if (isLocalhost) {
            console.log("[MailModule] WARNING: SMTP_HOST is localhost - forcing Gmail SMTP");
            // Force Gmail SMTP instead of using empty transporter
            console.log("[MailModule] Overriding to use smtp.gmail.com:465");
            const transportConfig: any = {
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: smtpMail,
                pass: smtpPassword,
              },
              tls: {
                rejectUnauthorized: false,
              },
            };

            console.log("[MailModule] Transport config:", {
              host: transportConfig.host,
              port: transportConfig.port,
              secure: transportConfig.secure,
              user: transportConfig.auth.user,
              hasPassword: !!transportConfig.auth.pass
            });
            
            Logger.log(
              `Creating SMTP transport: Host: smtp.gmail.com, Port: 465, Secure: true, User: ${smtpMail}`,
              "MailModule",
            );

            // Pass transport config directly to MailerModule
            transport = transportConfig;
            console.log("[MailModule] Transport config passed directly to MailerModule (localhost override)");
          } else {
            console.log("[MailModule] Creating transport with host/port config");
            const isSecure = finalPort === 465; // Port 465 uses SSL, 587 uses TLS
            
            // For Gmail and other services, explicitly set host/port and DO NOT use 'service'
            // This prevents nodemailer from overriding our settings with defaults
            const transportConfig: any = {
              host: finalHost,
              port: Number(finalPort), // Ensure it's a number
              secure: isSecure, // true for 465, false for other ports
              auth: {
                user: smtpMail,
                pass: smtpPassword,
              },
            };

            // For Gmail with port 465, ensure SSL is properly configured
            if (isSecure) {
              transportConfig.tls = {
                rejectUnauthorized: false, // Allow self-signed certificates if needed
              };
            } else {
              // For TLS (port 587)
              transportConfig.requireTLS = true;
              transportConfig.tls = {
                rejectUnauthorized: false,
              };
            }

            console.log("[MailModule] Transport config:", {
              host: transportConfig.host,
              port: transportConfig.port,
              secure: transportConfig.secure,
              user: transportConfig.auth.user,
              hasPassword: !!transportConfig.auth.pass
            });
            
            Logger.log(
              `Creating SMTP transport: Host: ${finalHost}, Port: ${finalPort}, Secure: ${isSecure}, User: ${smtpMail}`,
              "MailModule",
            );

            // Pass transport config directly to MailerModule
            transport = transportConfig;
            console.log("[MailModule] Transport config passed directly to MailerModule");
          }
        }
        // PRIORITY 3: Use SMTP_SERVICE for other services
        else if (smtpService && smtpMail && smtpPassword) {
          console.log("[MailModule] Using SMTP_SERVICE:", smtpService);
          console.log("  Mail:", smtpMail);
          
          if (finalHost && finalPort) {
            // For other services, use explicit host/port if available
            console.log("[MailModule] Using explicit host/port config");
            console.log("  Host:", finalHost);
            console.log("  Port:", finalPort);
            
            const isSecure = finalPort === 465;
            const transportConfig: any = {
              host: finalHost,
              port: Number(finalPort),
              secure: isSecure,
              auth: {
                user: smtpMail,
                pass: smtpPassword,
              },
            };
            
            if (isSecure) {
              transportConfig.tls = {
                rejectUnauthorized: false,
              };
            } else {
              transportConfig.requireTLS = true;
              transportConfig.tls = {
                rejectUnauthorized: false,
              };
            }
            
            // Pass transport config directly to MailerModule
            transport = transportConfig;
            console.log("[MailModule] Transport config passed directly to MailerModule");
          } else {
            // Use service-based config (nodemailer will use service defaults)
            Logger.log(
              `Using SMTP service: ${smtpService} with email: ${smtpMail ? "***" : "not set"}`,
              "MailModule",
            );
            // Pass service config directly to MailerModule
            transport = {
              service: smtpService,
              auth: {
                user: smtpMail,
                pass: smtpPassword,
              },
            };
            console.log("[MailModule] Service-based transport config passed directly to MailerModule");
          }
        } else {
          console.log("[MailModule] No valid SMTP config - using empty transporter");
          Logger.warn(
            `SMTP configuration incomplete. Required: SMTP_HOST, SMTP_PORT, SMTP_MAIL, SMTP_PASSWORD. Found - Host: ${smtpHost || "not set"}, Port: ${smtpPort || "not set"}, Mail: ${smtpMail ? "set" : "not set"}, Password: ${smtpPassword ? "set" : "not set"}`,
            "MailModule",
          );
          Logger.warn(
            "Since SMTP configuration is not set, emails would be logged to the console instead. This is not recommended for production environments.",
            "MailModule",
          );
          transport = emptyTransporter;
        }

        // Final verification: ensure transport is properly configured
        if (transport) {
          // If transport is a config object (not a pre-created transporter)
          if (typeof transport === 'object' && !transport.sendMail && transport.host) {
            const finalConfig = transport;
            console.log("[MailModule] Final transport configuration being returned:", {
              host: finalConfig.host || "N/A",
              port: finalConfig.port || "N/A",
              secure: finalConfig.secure !== undefined ? finalConfig.secure : "N/A",
              service: finalConfig.service || "N/A",
              hasAuth: !!finalConfig.auth
            });
            
            // Warn if we detect localhost configuration
            if (finalConfig.host && (finalConfig.host === "localhost" || finalConfig.host === "127.0.0.1" || finalConfig.host.startsWith("127."))) {
              Logger.error(
                `CRITICAL: Transport is configured with localhost (${finalConfig.host}:${finalConfig.port}). This will not work!`,
                "MailModule",
              );
            }
          } else {
            // If transport is a pre-created transporter
            const finalConfig = (transport as any).options || (transport as any).transporter?.options || {};
            console.log("[MailModule] Final transport configuration being returned:", {
              host: finalConfig.host || "N/A",
              port: finalConfig.port || "N/A",
              secure: finalConfig.secure !== undefined ? finalConfig.secure : "N/A",
              service: finalConfig.service || "N/A",
              hasAuth: !!finalConfig.auth
            });
            
            // Warn if we detect localhost configuration
            if (finalConfig.host && (finalConfig.host === "localhost" || finalConfig.host === "127.0.0.1" || finalConfig.host.startsWith("127."))) {
              Logger.error(
                `CRITICAL: Transport is configured with localhost (${finalConfig.host}:${finalConfig.port}). This will not work!`,
                "MailModule",
              );
            }
          }
        }

        return {
          defaults: { from: smtpMail || "noreply@internvista.com" },
          transport,
        };
      },
    }),
  ],
  providers: [MailService, EmailTemplatesService],
  exports: [MailService, EmailTemplatesService],
})
export class MailModule {}
