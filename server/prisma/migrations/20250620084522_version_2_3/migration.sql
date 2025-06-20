-- DropForeignKey
ALTER TABLE "SavedInterview" DROP CONSTRAINT "SavedInterview_interviewId_fkey";

-- AddForeignKey
ALTER TABLE "SavedInterview" ADD CONSTRAINT "SavedInterview_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
