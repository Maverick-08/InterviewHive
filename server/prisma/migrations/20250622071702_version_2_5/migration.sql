/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `branchName` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseName` on the `Course` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `InterviewTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[courseInitials]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseInitials` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `degree` to the `Course` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Course` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_authorId_fkey";

-- DropForeignKey
ALTER TABLE "SavedInterview" DROP CONSTRAINT "SavedInterview_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_courseId_fkey";

-- DropForeignKey
ALTER TABLE "_InterviewToTag" DROP CONSTRAINT "_InterviewToTag_B_fkey";

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "branchName",
DROP COLUMN "courseId",
DROP COLUMN "courseName",
ADD COLUMN     "branch" TEXT,
ADD COLUMN     "courseInitials" TEXT NOT NULL,
ADD COLUMN     "degree" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "bookmarkCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "viewCount" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "InterviewTag";

-- CreateTable
CREATE TABLE "InterviewTopicTag" (
    "id" TEXT NOT NULL,
    "tagInitials" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "InterviewTopicTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewTopicTag_tagInitials_key" ON "InterviewTopicTag"("tagInitials");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewTopicTag_tagName_key" ON "InterviewTopicTag"("tagName");

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseInitials_key" ON "Course"("courseInitials");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseInitials") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedInterview" ADD CONSTRAINT "SavedInterview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterviewToTag" ADD CONSTRAINT "_InterviewToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "InterviewTopicTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
