/*
  Warnings:

  - You are about to alter the column `viewCount` on the `Interview` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to drop the `vectorStore` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Interview" ALTER COLUMN "viewCount" SET DATA TYPE INTEGER;

-- DropTable
-- DROP TABLE "vectorStore";
