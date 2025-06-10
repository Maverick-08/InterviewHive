/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `branch` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `branch` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `User` table. All the data in the column will be lost.
  - Added the required column `branchName` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseName` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_course_branch_fkey";

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "branch",
DROP COLUMN "course",
ADD COLUMN     "branchName" TEXT NOT NULL,
ADD COLUMN     "courseId" TEXT NOT NULL,
ADD COLUMN     "courseName" TEXT NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "branch",
DROP COLUMN "course",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;
