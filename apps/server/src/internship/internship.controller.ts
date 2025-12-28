import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";

import { User } from "@/server/user/decorators/user.decorator";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { AdminGuard } from "../admin/guards/admin.guard";
import { InternshipService } from "./internship.service";

@ApiTags("Internship")
@Controller("internship")
export class InternshipController {
  constructor(private readonly internshipService: InternshipService) {}

  @Get()
  async getAllInternships(@Query("activeOnly") activeOnly?: string) {
    const active = activeOnly !== "false";
    return await this.internshipService.getAllInternships(active);
  }

  @Get(":id")
  async getInternshipById(@Param("id") id: string) {
    return await this.internshipService.getInternshipById(id);
  }

  @Post()
  @UseGuards(JwtGuard, AdminGuard)
  async createInternship(@User() user: UserEntity, @Body() data: any) {
    return await this.internshipService.createInternship({
      ...data,
      postedBy: user.id,
    });
  }

  @Patch(":id")
  @UseGuards(JwtGuard, AdminGuard)
  async updateInternship(@Param("id") id: string, @Body() data: any) {
    return await this.internshipService.updateInternship(id, data);
  }

  @Delete(":id")
  @UseGuards(JwtGuard, AdminGuard)
  async deleteInternship(@Param("id") id: string) {
    return await this.internshipService.deleteInternship(id);
  }

  @Post(":id/apply")
  @UseGuards(JwtGuard)
  async applyToInternship(
    @Param("id") internshipId: string,
    @User() user: UserEntity,
    @Body() body: { coverLetter?: string; resumeId?: string },
  ) {
    return await this.internshipService.applyToInternship(
      internshipId,
      user.id,
      body.coverLetter,
      body.resumeId,
    );
  }

  @Get("applications/my")
  @UseGuards(JwtGuard)
  async getMyApplications(@User() user: UserEntity) {
    return await this.internshipService.getUserApplications(user.id);
  }
}

