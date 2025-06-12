/*
  Warnings:

  - A unique constraint covering the columns `[tagName]` on the table `InterviewTag` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Question` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "InterviewRound_interviewId_key";

-- DropIndex
DROP INDEX "Question_roundId_key";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewTag_tagName_key" ON "InterviewTag"("tagName");
