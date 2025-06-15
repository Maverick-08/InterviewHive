-- CreateTable
CREATE TABLE "SavedInterview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,

    CONSTRAINT "SavedInterview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InterviewToSavedInterview" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InterviewToSavedInterview_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedInterview_userId_interviewId_key" ON "SavedInterview"("userId", "interviewId");

-- CreateIndex
CREATE INDEX "_InterviewToSavedInterview_B_index" ON "_InterviewToSavedInterview"("B");

-- AddForeignKey
ALTER TABLE "_InterviewToSavedInterview" ADD CONSTRAINT "_InterviewToSavedInterview_A_fkey" FOREIGN KEY ("A") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterviewToSavedInterview" ADD CONSTRAINT "_InterviewToSavedInterview_B_fkey" FOREIGN KEY ("B") REFERENCES "SavedInterview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
