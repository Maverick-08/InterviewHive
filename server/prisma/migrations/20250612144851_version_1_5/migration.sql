/*
  Warnings:

  - You are about to drop the `_InterviewToInterviewTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_InterviewToInterviewTag" DROP CONSTRAINT "_InterviewToInterviewTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_InterviewToInterviewTag" DROP CONSTRAINT "_InterviewToInterviewTag_B_fkey";

-- DropTable
DROP TABLE "_InterviewToInterviewTag";

-- CreateTable
CREATE TABLE "_InterviewToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InterviewToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_InterviewToTag_B_index" ON "_InterviewToTag"("B");

-- AddForeignKey
ALTER TABLE "_InterviewToTag" ADD CONSTRAINT "_InterviewToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterviewToTag" ADD CONSTRAINT "_InterviewToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "InterviewTag"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;
