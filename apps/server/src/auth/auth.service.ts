import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthProvidersDto, LoginDto, RegisterDto, UserWithSecrets } from "@reactive-resume/dto";
import { ErrorMessage } from "@reactive-resume/utils";
import * as bcryptjs from "bcryptjs";
import { randomBytes } from "crypto";
import { authenticator } from "otplib";

import { Config } from "../config/schema";
import { MailService } from "../mail/mail.service";
import { UserService } from "../user/user.service";
import { UtilsService } from "../utils/utils.service";
import { Payload } from "./utils/payload";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly utils: UtilsService,
  ) {}

  private hash(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }

  private compare(password: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(password, hash);
  }

  private async validatePassword(password: string, hashedPassword: string) {
    const isValid = await this.compare(password, hashedPassword);

    if (!isValid) {
      throw new BadRequestException(ErrorMessage.InvalidCredentials);
    }
  }

  generateToken(grantType: "access" | "refresh" | "reset" | "verification", payload?: Payload) {
    switch (grantType) {
      case "access":
        if (!payload) throw new InternalServerErrorException("InvalidTokenPayload");
        return this.jwtService.sign(payload, {
          secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET"),
          expiresIn: "15m", // 15 minutes
        });

      case "refresh":
        if (!payload) throw new InternalServerErrorException("InvalidTokenPayload");
        return this.jwtService.sign(payload, {
          secret: this.configService.getOrThrow("REFRESH_TOKEN_SECRET"),
          expiresIn: "2d", // 2 days
        });

      case "reset":
      case "verification":
        return randomBytes(32).toString("base64url");

      default:
        throw new InternalServerErrorException("InvalidGrantType: " + grantType);
    }
  }

  async setRefreshToken(email: string, token: string | null) {
    await this.userService.updateByEmail(email, {
      secrets: {
        update: {
          refreshToken: token,
          lastSignedIn: token ? new Date() : undefined,
        },
      },
    });
  }

  async validateRefreshToken(payload: Payload, token: string) {
    const user = await this.userService.findOneById(payload.id);
    const storedRefreshToken = user.secrets?.refreshToken;

    if (!storedRefreshToken || storedRefreshToken !== token) throw new ForbiddenException();

    if (!user.twoFactorEnabled) return user;

    if (payload.isTwoFactorAuth) return user;
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await this.hash(registerDto.password);

    try {
      const user = await this.userService.create({
        name: registerDto.name,
        email: registerDto.email,
        username: registerDto.username,
        locale: registerDto.locale,
        provider: "email",
        emailVerified: false, // Set to true if you don't want to verify user's email
        secrets: { create: { password: hashedPassword } },
      });

      // Send verification email (non-blocking - don't await)
      // Registration should succeed even if email sending fails
      this.sendVerificationEmail(user.email).catch((error) => {
        Logger.error(
          `Failed to send verification email during registration: ${error instanceof Error ? error.message : String(error)}`,
          "AuthService#register",
        );
      });

      return user as UserWithSecrets;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException(ErrorMessage.UserAlreadyExists);
      }

      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async authenticate({ identifier, password }: LoginDto) {
    try {
      const user = await this.userService.findOneByIdentifier(identifier);

      if (!user) {
        throw new BadRequestException(ErrorMessage.InvalidCredentials);
      }

      if (!user.secrets?.password) {
        throw new BadRequestException(ErrorMessage.OAuthUser);
      }

      await this.validatePassword(password, user.secrets?.password);

      return user;
    } catch (error) {
      throw new BadRequestException(ErrorMessage.InvalidCredentials);
    }
  }

  // Password Reset Flows
  async forgotPassword(email: string) {
    const token = this.generateToken("reset");

    await this.userService.updateByEmail(email, {
      secrets: { update: { resetToken: token } },
    });

    const url = `http://internvista.com/auth/reset-password?token=${token}`;
    const subject = "Reset your Reactive Resume password";
    const text = `Please click on the link below to reset your password:\n\n${url}`;

    await this.mailService.sendEmail({ to: email, subject, text });
  }

  async updatePassword(email: string, password: string) {
    const hashedPassword = await this.hash(password);

    await this.userService.updateByEmail(email, {
      secrets: { update: { password: hashedPassword } },
    });
  }

  async resetPassword(token: string, password: string) {
    const hashedPassword = await this.hash(password);

    await this.userService.updateByResetToken(token, {
      resetToken: null,
      password: hashedPassword,
    });
  }

  getAuthProviders() {
    const providers: AuthProvidersDto = [];

    if (!this.configService.get("DISABLE_EMAIL_AUTH")) {
      providers.push("email");
    }

    if (
      this.configService.get("GITHUB_CLIENT_ID") &&
      this.configService.get("GITHUB_CLIENT_SECRET") &&
      this.configService.get("GITHUB_CALLBACK_URL")
    ) {
      providers.push("github");
    }

    if (
      this.configService.get("GOOGLE_CLIENT_ID") &&
      this.configService.get("GOOGLE_CLIENT_SECRET") &&
      this.configService.get("GOOGLE_CALLBACK_URL")
    ) {
      providers.push("google");
    }

    return providers;
  }

  // Email Verification Flows
  /**
   * Generate a verification token (20-byte hex string)
   */
  private generateVerificationToken(): string {
    return randomBytes(20).toString("hex");
  }

  /**
   * Get token expiration date (24 hours from now)
   */
  private getTokenExpiration(): Date {
    return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  }

  /**
   * Send verification email to user
   * Non-blocking: errors are logged but don't throw
   */
  async sendVerificationEmail(email: string): Promise<void> {
    try {
      // Find user to get their name
      const user = await this.userService.findOneByIdentifier(email);
      if (!user) {
        Logger.warn(`User not found for email: ${email}`, "AuthService#sendVerificationEmail");
        return;
      }

      // Generate verification token (20-byte hex)
      const token = this.generateVerificationToken();
      const expiration = this.getTokenExpiration();

      // Set the verification token and expiration in the database
      await this.userService.updateByEmail(email, {
        secrets: {
          update: {
            verificationToken: token,
            verificationTokenExpire: expiration,
          },
        },
      });

      // Send verification email (non-blocking)
      // Don't await to avoid blocking registration flow
      this.mailService
        .sendVerificationEmail(email, user.name, token)
        .catch((error) => {
          Logger.error(
            `Failed to send verification email to ${email}: ${error instanceof Error ? error.message : String(error)}`,
            "AuthService#sendVerificationEmail",
          );
          // Don't throw - registration should succeed even if email fails
        });
    } catch (error) {
      Logger.error(
        `Error in sendVerificationEmail for ${email}: ${error instanceof Error ? error.message : String(error)}`,
        "AuthService#sendVerificationEmail",
      );
      // Don't throw - allow registration to continue even if email setup fails
    }
  }

  /**
   * Verify email using token
   * Checks token validity and expiration
   */
  async verifyEmail(token: string): Promise<void> {
    if (!token) {
      throw new BadRequestException(ErrorMessage.InvalidVerificationToken);
    }

    // Find user by verification token
    const user = await this.userService.findByVerificationToken(token);

    if (!user) {
      throw new BadRequestException(ErrorMessage.InvalidVerificationToken);
    }

    const storedToken = user.secrets?.verificationToken;
    const tokenExpire = user.secrets?.verificationTokenExpire;

    // Validate token matches
    if (!storedToken || storedToken !== token) {
      throw new BadRequestException(ErrorMessage.InvalidVerificationToken);
    }

    // Check if token has expired
    if (!tokenExpire || new Date() > tokenExpire) {
      throw new BadRequestException("Verification token has expired. Please request a new verification email.");
    }

    // Verify email and clear token
    await this.userService.updateByEmail(user.email, {
      emailVerified: true,
      secrets: {
        update: {
          verificationToken: null,
          verificationTokenExpire: null,
        },
      },
    });

    // Send welcome email (non-blocking)
    this.mailService
      .sendWelcomeEmail(user.email, user.name)
      .catch((error) => {
        Logger.error(
          `Failed to send welcome email to ${user.email}: ${error instanceof Error ? error.message : String(error)}`,
          "AuthService#verifyEmail",
        );
        // Don't throw - verification should succeed even if welcome email fails
      });
  }

  /**
   * Resend verification email
   * Generates new token and expiration
   */
  async resendVerificationEmail(email: string): Promise<void> {
    // Find user by email
    const user = await this.userService.findOneByIdentifier(email);

    if (!user) {
      // Don't reveal if user exists or not for security
      Logger.warn(`Resend verification requested for non-existent email: ${email}`, "AuthService#resendVerificationEmail");
      return; // Silently succeed to prevent email enumeration
    }

    // Check if already verified
    if (user.emailVerified) {
      throw new BadRequestException(ErrorMessage.EmailAlreadyVerified);
    }

    // Generate new verification token and expiration
    const token = this.generateVerificationToken();
    const expiration = this.getTokenExpiration();

    // Update token in database
    await this.userService.updateByEmail(email, {
      secrets: {
        update: {
          verificationToken: token,
          verificationTokenExpire: expiration,
        },
      },
    });

    // Send verification email
    await this.mailService.sendVerificationEmail(email, user.name, token);
  }

  // Two-Factor Authentication Flows
  async setup2FASecret(email: string) {
    // If the user already has 2FA enabled, throw an error
    const user = await this.userService.findOneByIdentifier(email);

    if (user.twoFactorEnabled) {
      throw new BadRequestException(ErrorMessage.TwoFactorAlreadyEnabled);
    }

    const secret = authenticator.generateSecret();
    const uri = authenticator.keyuri(email, "Reactive Resume", secret);

    await this.userService.updateByEmail(email, {
      secrets: { update: { twoFactorSecret: secret } },
    });

    return { message: uri };
  }

  async enable2FA(email: string, code: string) {
    const user = await this.userService.findOneByIdentifier(email);

    // If the user already has 2FA enabled, throw an error
    if (user.twoFactorEnabled) {
      throw new BadRequestException(ErrorMessage.TwoFactorAlreadyEnabled);
    }

    // If the user doesn't have a 2FA secret set, throw an error
    if (!user.secrets?.twoFactorSecret) {
      throw new BadRequestException(ErrorMessage.TwoFactorNotEnabled);
    }

    const verified = authenticator.verify({
      secret: user.secrets?.twoFactorSecret,
      token: code,
    });

    if (!verified) {
      throw new BadRequestException(ErrorMessage.InvalidTwoFactorCode);
    }

    // Create backup codes and store them in the database
    const backupCodes = Array.from({ length: 8 }, () => randomBytes(5).toString("hex"));

    await this.userService.updateByEmail(email, {
      twoFactorEnabled: true,
      secrets: { update: { twoFactorBackupCodes: backupCodes } },
    });

    return { backupCodes };
  }

  async disable2FA(email: string) {
    const user = await this.userService.findOneByIdentifier(email);

    // If the user doesn't have 2FA enabled, throw an error
    if (!user.twoFactorEnabled) {
      throw new BadRequestException(ErrorMessage.TwoFactorNotEnabled);
    }

    await this.userService.updateByEmail(email, {
      twoFactorEnabled: false,
      secrets: { update: { twoFactorSecret: null, twoFactorBackupCodes: [] } },
    });
  }

  async verify2FACode(email: string, code: string) {
    const user = await this.userService.findOneByIdentifier(email);

    // If the user doesn't have 2FA enabled, or does not have a 2FA secret set, throw an error
    if (!user.twoFactorEnabled || !user.secrets?.twoFactorSecret) {
      throw new BadRequestException(ErrorMessage.TwoFactorNotEnabled);
    }

    const verified = authenticator.verify({
      secret: user.secrets?.twoFactorSecret,
      token: code,
    });

    if (!verified) {
      throw new BadRequestException(ErrorMessage.InvalidTwoFactorCode);
    }

    return user;
  }

  async useBackup2FACode(email: string, code: string) {
    const user = await this.userService.findOneByIdentifier(email);

    // If the user doesn't have 2FA enabled, or does not have a 2FA secret set, throw an error
    if (!user.twoFactorEnabled || !user.secrets?.twoFactorSecret) {
      throw new BadRequestException(ErrorMessage.TwoFactorNotEnabled);
    }

    const verified = user.secrets?.twoFactorBackupCodes.includes(code);

    if (!verified) {
      throw new BadRequestException(ErrorMessage.InvalidTwoFactorBackupCode);
    }

    // Remove the used backup code from the database
    const backupCodes = user.secrets?.twoFactorBackupCodes.filter((c) => c !== code);
    await this.userService.updateByEmail(email, {
      secrets: { update: { twoFactorBackupCodes: backupCodes } },
    });

    return user as UserWithSecrets;
  }
}

