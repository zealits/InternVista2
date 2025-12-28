-- CreateTable
CREATE TABLE "Internship" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "type" TEXT,
    "duration" TEXT,
    "stipend" TEXT,
    "requirements" TEXT,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "postedBy" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deadline" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternshipApplication" (
    "id" TEXT NOT NULL,
    "internshipId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "coverLetter" TEXT,
    "resumeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternshipApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Internship_isActive_idx" ON "Internship"("isActive");

-- CreateIndex
CREATE INDEX "Internship_postedBy_idx" ON "Internship"("postedBy");

-- CreateIndex
CREATE INDEX "InternshipApplication_internshipId_idx" ON "InternshipApplication"("internshipId");

-- CreateIndex
CREATE INDEX "InternshipApplication_userId_idx" ON "InternshipApplication"("userId");

-- CreateIndex
CREATE INDEX "InternshipApplication_status_idx" ON "InternshipApplication"("status");

-- CreateIndex
CREATE UNIQUE INDEX "InternshipApplication_internshipId_userId_key" ON "InternshipApplication"("internshipId", "userId");

-- AddForeignKey
ALTER TABLE "InternshipApplication" ADD CONSTRAINT "InternshipApplication_internshipId_fkey" FOREIGN KEY ("internshipId") REFERENCES "Internship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternshipApplication" ADD CONSTRAINT "InternshipApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
