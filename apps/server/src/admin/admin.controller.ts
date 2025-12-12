import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AdminGuard } from "./guards/admin.guard";
import { AdminService } from "./admin.service";

@ApiTags("Admin")
@Controller("admin")
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("candidates/count")
  async getCandidateCount() {
    const count = await this.adminService.getCandidateCount();
    return { count };
  }

  @Get("resumes/count")
  async getResumeCount() {
    const count = await this.adminService.getResumeCount();
    return { count };
  }

  @Get("users/by-provider")
  async getUsersByProvider() {
    return await this.adminService.getUsersByProvider();
  }

  @Get("statistics")
  async getStatistics() {
    return await this.adminService.getStatistics();
  }

  @Get("users/recent")
  async getRecentUsers(@Query("limit") limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 5;
    return await this.adminService.getRecentUsers(limitNum);
  }

  @Get("users")
  async getAllUsers(
    @Query("skip") skip?: string,
    @Query("take") take?: string,
  ) {
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 50;
    return await this.adminService.getAllUsers(skipNum, takeNum);
  }

  @Get("resumes")
  async getAllResumes(
    @Query("skip") skip?: string,
    @Query("take") take?: string,
  ) {
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 50;
    return await this.adminService.getAllResumes(skipNum, takeNum);
  }

  @Get("users/email-verified")
  async getUsersByEmailVerified(
    @Query("verified") verified?: string,
    @Query("skip") skip?: string,
    @Query("take") take?: string,
  ) {
    const emailVerified = verified === "true" || verified === undefined;
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 50;
    return await this.adminService.getUsersByEmailVerified(emailVerified, skipNum, takeNum);
  }

  @Get("users/two-factor")
  async getUsersByTwoFactor(
    @Query("enabled") enabled?: string,
    @Query("skip") skip?: string,
    @Query("take") take?: string,
  ) {
    const twoFactorEnabled = enabled === "true" || enabled === undefined;
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 50;
    return await this.adminService.getUsersByTwoFactor(twoFactorEnabled, skipNum, takeNum);
  }

  @Get("users/provider/:provider")
  async getUsersByProviderFilter(
    @Param("provider") provider: string,
    @Query("skip") skip?: string,
    @Query("take") take?: string,
  ) {
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 50;
    return await this.adminService.getUsersByProviderFilter(provider, skipNum, takeNum);
  }
}

