/*
  Warnings:

  - You are about to drop the column `currentCountStamp` on the `InterviewTopicTag` table. All the data in the column will be lost.
  - You are about to drop the column `growthPercentage` on the `InterviewTopicTag` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdatedAt` on the `InterviewTopicTag` table. All the data in the column will be lost.
  - You are about to drop the column `previousCountStamp` on the `InterviewTopicTag` table. All the data in the column will be lost.
  - You are about to drop the `DashboardStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "InterviewTopicTag" DROP COLUMN "currentCountStamp",
DROP COLUMN "growthPercentage",
DROP COLUMN "lastUpdatedAt",
DROP COLUMN "previousCountStamp";

-- DropTable
DROP TABLE "DashboardStats";
