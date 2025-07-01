-- AlterTable
ALTER TABLE "Project" ADD COLUMN "trashedAt" DATETIME;

-- CreateIndex
CREATE INDEX "Project_userId_trashedAt_idx" ON "Project"("userId", "trashedAt");
