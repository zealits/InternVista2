import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Logger,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthResponseDto, LoginDto, RegisterDto } from "@reactive-resume/dto";
import { ErrorMessage } from "@reactive-resume/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Response } from "express";

import { AuthService } from "../auth/auth.service";
import { LocalGuard } from "../auth/guards/local.guard";
import { getCookieOptions } from "../auth/utils/cookie";
import { payloadSchema } from "../auth/utils/payload";
import { AdminService } from "./admin.service";
import { PrismaService } from "nestjs-prisma";
import * as bcryptjs from "bcryptjs";

@ApiTags("Admin Auth")
@Controller("admin/auth")
export class AdminAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
    private readonly prisma: PrismaService,
  ) {}

  private async exchangeToken(id: string, email: string) {
    const payload = payloadSchema.parse({ id, isTwoFactorAuth: false });
    const accessToken = this.authService.generateToken("access", payload);
    const refreshToken = this.authService.generateToken("refresh", payload);
    await this.authService.setRefreshToken(email, refreshToken);
    return { accessToken, refreshToken };
  }

  @Post("register")
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const hashedPassword = await bcryptjs.hash(registerDto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          username: registerDto.username,
          locale: registerDto.locale || "en-US",
          provider: "email",
          emailVerified: true, // Admin accounts are auto-verified
          isAdmin: true, // Set admin flag
          secrets: {
            create: {
              password: hashedPassword,
            },
          },
        },
        include: {
          secrets: true,
        },
      });

      const { accessToken, refreshToken } = await this.exchangeToken(user.id, user.email);

      response.cookie("Authentication", accessToken, getCookieOptions("access"));
      response.cookie("Refresh", refreshToken, getCookieOptions("refresh"));

      // Extract user without secrets, ensuring isAdmin is included
      const { secrets, ...userWithoutSecrets } = user;
      const responseData: AuthResponseDto = {
        status: "authenticated",
        user: {
          ...userWithoutSecrets,
          isAdmin: user.isAdmin,
        },
      };

      response.status(201).send(responseData);
    } catch (error) {
      Logger.error(`Admin registration error: ${error instanceof Error ? error.message : String(error)}`, "AdminAuthController#register");
      
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException(ErrorMessage.UserAlreadyExists);
      }
      
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : ErrorMessage.SomethingWentWrong,
      );
    }
  }

  @Post("login")
  @UseGuards(LocalGuard)
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const user = await this.authService.authenticate(loginDto);

    // Check if user is admin
    if (!user.isAdmin) {
      throw new BadRequestException("Only admin users can access this area");
    }

    const { accessToken, refreshToken } = await this.exchangeToken(user.id, user.email);

    response.cookie("Authentication", accessToken, getCookieOptions("access"));
    response.cookie("Refresh", refreshToken, getCookieOptions("refresh"));

    // Extract user without secrets, ensuring isAdmin is included
    const { secrets, ...userWithoutSecrets } = user;
    const responseData: AuthResponseDto = {
      status: "authenticated",
      user: {
        ...userWithoutSecrets,
        isAdmin: user.isAdmin,
      },
    };

    response.status(200).send(responseData);
  }
}

