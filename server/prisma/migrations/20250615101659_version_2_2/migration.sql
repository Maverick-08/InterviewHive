/*
  Warnings:

  - You are about to drop the column `tagId` on the `SavedInterview` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SavedInterview" DROP CONSTRAINT "SavedInterview_tagId_fkey";

-- DropIndex
DROP INDEX "SavedInterview_tagId_key";

-- AlterTable
ALTER TABLE "SavedInterview" DROP COLUMN "tagId";
