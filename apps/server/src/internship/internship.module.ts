import { Module } from "@nestjs/common";

import { AuthModule } from "@/server/auth/auth.module";

import { InternshipController } from "./internship.controller";
import { InternshipService } from "./internship.service";

@Module({
  imports: [AuthModule],
  controllers: [InternshipController],
  providers: [InternshipService],
  exports: [InternshipService],
})
export class InternshipModule {}


