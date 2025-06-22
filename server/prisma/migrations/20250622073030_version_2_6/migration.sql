/*
  Warnings:

  - Added the required column `currentCountStamp` to the `InterviewTopicTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `growthPercentage` to the `InterviewTopicTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdatedAt` to the `InterviewTopicTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previousCountStamp` to the `InterviewTopicTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewTopicTag" ADD COLUMN     "currentCountStamp" INTEGER NOT NULL,
ADD COLUMN     "growthPercentage" INTEGER NOT NULL,
ADD COLUMN     "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "previousCountStamp" INTEGER NOT NULL;
