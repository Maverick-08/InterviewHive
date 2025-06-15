/*
  Warnings:

  - A unique constraint covering the columns `[tagId]` on the table `SavedInterview` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tagId` to the `SavedInterview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedInterview" ADD COLUMN     "tagId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SavedInterview_tagId_key" ON "SavedInterview"("tagId");

-- AddForeignKey
ALTER TABLE "SavedInterview" ADD CONSTRAINT "SavedInterview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedInterview" ADD CONSTRAINT "SavedInterview_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "InterviewTag"("tagId") ON DELETE RESTRICT ON UPDATE CASCADE;
