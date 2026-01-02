import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { UserWithSecrets } from "@reactive-resume/dto";
import { Request } from "express";

import { JwtGuard } from "../../auth/guards/jwt.guard";

@Injectable()
export class AdminGuard extends JwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First check JWT authentication
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      return false;
    }

    // Then check if user is admin
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserWithSecrets;

    if (!user || !user.isAdmin) {
      throw new ForbiddenException("Admin access required");
    }

    return true;
  }
}


