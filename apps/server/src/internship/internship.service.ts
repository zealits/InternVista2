import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class InternshipService {
  constructor(private readonly prisma: PrismaService) {}

  async createInternship(data: {
    title: string;
    company: string;
    description: string;
    location?: string;
    type?: string;
    duration?: string;
    stipend?: string;
    requirements?: string;
    skills?: string[];
    deadline?: Date;
    postedBy: string;
  }) {
    return await this.prisma.internship.create({
      data: {
        title: data.title,
        company: data.company,
        description: data.description,
        location: data.location,
        type: data.type,
        duration: data.duration,
        stipend: data.stipend,
        requirements: data.requirements,
        skills: data.skills || [],
        deadline: data.deadline,
        postedBy: data.postedBy,
        isActive: true,
      },
    });
  }

  async getAllInternships(activeOnly: boolean = true) {
    return await this.prisma.internship.findMany({
      where: activeOnly ? { isActive: true } : {},
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });
  }

  async getInternshipById(id: string) {
    const internship = await this.prisma.internship.findUnique({
      where: { id },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!internship) {
      throw new NotFoundException("Internship not found");
    }

    return internship;
  }

  async updateInternship(
    id: string,
    data: {
      title?: string;
      company?: string;
      description?: string;
      location?: string;
      type?: string;
      duration?: string;
      stipend?: string;
      requirements?: string;
      skills?: string[];
      deadline?: Date;
      isActive?: boolean;
    },
  ) {
    const internship = await this.getInternshipById(id);

    return await this.prisma.internship.update({
      where: { id },
      data,
    });
  }

  async deleteInternship(id: string) {
    await this.getInternshipById(id);
    return await this.prisma.internship.delete({
      where: { id },
    });
  }

  async applyToInternship(internshipId: string, userId: string, coverLetter?: string, resumeId?: string) {
    // Check if internship exists and is active
    const internship = await this.getInternshipById(internshipId);
    if (!internship.isActive) {
      throw new BadRequestException("This internship is no longer accepting applications");
    }

    // Check if deadline has passed
    if (internship.deadline && new Date(internship.deadline) < new Date()) {
      throw new BadRequestException("The application deadline for this internship has passed");
    }

    // Check if user has already applied
    const existingApplication = await this.prisma.internshipApplication.findUnique({
      where: {
        internshipId_userId: {
          internshipId,
          userId,
        },
      },
    });

    if (existingApplication) {
      throw new BadRequestException("You have already applied to this internship");
    }

    return await this.prisma.internshipApplication.create({
      data: {
        internshipId,
        userId,
        coverLetter,
        resumeId,
        status: "pending",
      },
      include: {
        internship: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
          },
        },
      },
    });
  }

  async getUserApplications(userId: string) {
    return await this.prisma.internshipApplication.findMany({
      where: { userId },
      include: {
        internship: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getInternshipApplications(internshipId: string) {
    await this.getInternshipById(internshipId);

    return await this.prisma.internshipApplication.findMany({
      where: { internshipId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
            picture: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getAllApplications() {
    return await this.prisma.internshipApplication.findMany({
      include: {
        internship: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
            picture: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateApplicationStatus(applicationId: string, status: "pending" | "accepted" | "rejected") {
    const application = await this.prisma.internshipApplication.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      throw new NotFoundException("Application not found");
    }

    return await this.prisma.internshipApplication.update({
      where: { id: applicationId },
      data: { status },
      include: {
        internship: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
          },
        },
      },
    });
  }
}


