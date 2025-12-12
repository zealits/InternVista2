import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getCandidateCount(): Promise<number> {
    return await this.prisma.user.count({
      where: {
        isAdmin: false,
      },
    });
  }

  async getResumeCount(): Promise<number> {
    return await this.prisma.resume.count();
  }

  async getUsersByProvider() {
    const users = await this.prisma.user.groupBy({
      by: ["provider"],
      where: {
        isAdmin: false,
      },
      _count: {
        id: true,
      },
    });

    return users.map((user) => ({
      provider: user.provider,
      count: user._count.id,
    }));
  }

  async getEmailVerifiedCount(): Promise<number> {
    return await this.prisma.user.count({
      where: {
        emailVerified: true,
        isAdmin: false,
      },
    });
  }

  async getTwoFactorEnabledCount(): Promise<number> {
    return await this.prisma.user.count({
      where: {
        twoFactorEnabled: true,
        isAdmin: false,
      },
    });
  }

  async getRecentUsers(limit: number = 5) {
    return await this.prisma.user.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        picture: true,
        provider: true,
        emailVerified: true,
        createdAt: true,
      },
    });
  }

  async getStatistics() {
    const [
      candidateCount,
      resumeCount,
      emailVerifiedCount,
      twoFactorEnabledCount,
      usersByProvider,
    ] = await Promise.all([
      this.getCandidateCount(),
      this.getResumeCount(),
      this.getEmailVerifiedCount(),
      this.getTwoFactorEnabledCount(),
      this.getUsersByProvider(),
    ]);

    return {
      candidates: candidateCount,
      resumes: resumeCount,
      emailVerified: emailVerifiedCount,
      twoFactorEnabled: twoFactorEnabledCount,
      usersByProvider,
    };
  }

  async getAllUsers(skip: number = 0, take: number = 50) {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          isAdmin: false,
        },
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          picture: true,
          provider: true,
          emailVerified: true,
          twoFactorEnabled: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              resumes: true,
            },
          },
        },
      }),
      this.prisma.user.count({
        where: {
          isAdmin: false,
        },
      }),
    ]);

    return {
      users,
      total,
      page: Math.floor(skip / take) + 1,
      pageSize: take,
      totalPages: Math.ceil(total / take),
    };
  }

  async getAllResumes(skip: number = 0, take: number = 50) {
    const [resumes, total] = await Promise.all([
      this.prisma.resume.findMany({
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
            },
          },
        },
      }),
      this.prisma.resume.count(),
    ]);

    return {
      resumes,
      total,
      page: Math.floor(skip / take) + 1,
      pageSize: take,
      totalPages: Math.ceil(total / take),
    };
  }

  async getUsersByEmailVerified(emailVerified: boolean, skip: number = 0, take: number = 50) {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          emailVerified,
          isAdmin: false,
        },
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          picture: true,
          provider: true,
          emailVerified: true,
          twoFactorEnabled: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              resumes: true,
            },
          },
        },
      }),
      this.prisma.user.count({
        where: {
          emailVerified,
          isAdmin: false,
        },
      }),
    ]);

    return {
      users,
      total,
      page: Math.floor(skip / take) + 1,
      pageSize: take,
      totalPages: Math.ceil(total / take),
    };
  }

  async getUsersByTwoFactor(twoFactorEnabled: boolean, skip: number = 0, take: number = 50) {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          twoFactorEnabled,
          isAdmin: false,
        },
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          picture: true,
          provider: true,
          emailVerified: true,
          twoFactorEnabled: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              resumes: true,
            },
          },
        },
      }),
      this.prisma.user.count({
        where: {
          twoFactorEnabled,
          isAdmin: false,
        },
      }),
    ]);

    return {
      users,
      total,
      page: Math.floor(skip / take) + 1,
      pageSize: take,
      totalPages: Math.ceil(total / take),
    };
  }

  async getUsersByProviderFilter(provider: string, skip: number = 0, take: number = 50) {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          provider: provider as any,
          isAdmin: false,
        },
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          picture: true,
          provider: true,
          emailVerified: true,
          twoFactorEnabled: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              resumes: true,
            },
          },
        },
      }),
      this.prisma.user.count({
        where: {
          provider: provider as any,
          isAdmin: false,
        },
      }),
    ]);

    return {
      users,
      total,
      page: Math.floor(skip / take) + 1,
      pageSize: take,
      totalPages: Math.ceil(total / take),
    };
  }
}

