import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Config } from "@/server/config/schema";

/**
 * Email Templates Service
 * Provides HTML email templates for verification and welcome emails
 */
@Injectable()
export class EmailTemplatesService {
  constructor(private readonly configService: ConfigService<Config>) {}

  /**
   * Get the frontend URL for email links
   */
  private getFrontendUrl(): string {
    const publicUrl = this.configService.get("PUBLIC_URL");
    const devClientUrl = this.configService.get("__DEV__CLIENT_URL");
    return publicUrl || devClientUrl || "http://localhost:5173";
  }

  /**
   * Base HTML email template wrapper
   */
  private getBaseTemplate(content: string, subject: string): string {
    const frontendUrl = this.getFrontendUrl();
    const appName = "InternVista"; // You can make this configurable

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .email-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px 20px;
      text-align: center;
    }
    .email-header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .email-body {
      padding: 40px 30px;
    }
    .email-footer {
      background-color: #f8f9fa;
      padding: 20px 30px;
      text-align: center;
      font-size: 12px;
      color: #6c757d;
      border-top: 1px solid #e9ecef;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
    }
    .button:hover {
      opacity: 0.9;
    }
    .text-link {
      color: #667eea;
      word-break: break-all;
    }
    .expiration-notice {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 12px 16px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .expiration-notice p {
      margin: 0;
      font-size: 14px;
      color: #856404;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>${appName}</h1>
    </div>
    <div class="email-body">
      ${content}
    </div>
    <div class="email-footer">
      <p>© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
      <p>If you have any questions, please contact our support team.</p>
      <p>This is an automated email, please do not reply.</p>
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Generate verification email HTML template
   */
  getVerificationEmailTemplate(
    name: string,
    email: string,
    verificationToken: string,
  ): { subject: string; html: string; text: string } {
    const frontendUrl = this.getFrontendUrl();
    const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;

    const htmlContent = `
      <h2>Hello ${name}!</h2>
      <p>Thank you for signing up for InternVista. To complete your registration, please verify your email address by clicking the button below:</p>
      
      <div style="text-align: center;">
        <a href="${verificationUrl}" class="button">Verify Email Address</a>
      </div>
      
      <p>Or copy and paste this link into your browser:</p>
      <p><a href="${verificationUrl}" class="text-link">${verificationUrl}</a></p>
      
      <div class="expiration-notice">
        <p><strong>⏰ Important:</strong> This verification link will expire in 24 hours. Please verify your email as soon as possible.</p>
      </div>
      
      <p>If you didn't create an account with InternVista, you can safely ignore this email.</p>
    `;

    const textContent = `
Hello ${name}!

Thank you for signing up for InternVista. To complete your registration, please verify your email address by clicking the link below:

${verificationUrl}

Important: This verification link will expire in 24 hours. Please verify your email as soon as possible.

If you didn't create an account with InternVista, you can safely ignore this email.
    `.trim();

    return {
      subject: "Verify Your Email Address - InternVista",
      html: this.getBaseTemplate(htmlContent, "Verify Your Email Address"),
      text: textContent,
    };
  }

  /**
   * Generate welcome email HTML template
   */
  getWelcomeEmailTemplate(name: string, email: string): { subject: string; html: string; text: string } {
    const frontendUrl = this.getFrontendUrl();
    const loginUrl = `${frontendUrl}/auth/login`;

    const htmlContent = `
      <h2>Welcome to InternVista, ${name}! 🎉</h2>
      <p>Your email has been successfully verified. You're all set to start using InternVista!</p>
      
      <p>You can now log in to your account and start exploring all the features we have to offer.</p>
      
      <div style="text-align: center;">
        <a href="${loginUrl}" class="button">Log In to Your Account</a>
      </div>
      
      <p>Or copy and paste this link into your browser:</p>
      <p><a href="${loginUrl}" class="text-link">${loginUrl}</a></p>
      
      <p>If you have any questions or need help, don't hesitate to reach out to our support team.</p>
      
      <p>Best regards,<br>The InternVista Team</p>
    `;

    const textContent = `
Welcome to InternVista, ${name}!

Your email has been successfully verified. You're all set to start using InternVista!

You can now log in to your account:
${loginUrl}

If you have any questions or need help, don't hesitate to reach out to our support team.

Best regards,
The InternVista Team
    `.trim();

    return {
      subject: "Welcome to InternVista!",
      html: this.getBaseTemplate(htmlContent, "Welcome to InternVista"),
      text: textContent,
    };
  }
}






