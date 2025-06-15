/*
  Warnings:

  - You are about to drop the `_InterviewToSavedInterview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_InterviewToSavedInterview" DROP CONSTRAINT "_InterviewToSavedInterview_A_fkey";

-- DropForeignKey
ALTER TABLE "_InterviewToSavedInterview" DROP CONSTRAINT "_InterviewToSavedInterview_B_fkey";

-- DropTable
DROP TABLE "_InterviewToSavedInterview";

-- AddForeignKey
ALTER TABLE "SavedInterview" ADD CONSTRAINT "SavedInterview_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
