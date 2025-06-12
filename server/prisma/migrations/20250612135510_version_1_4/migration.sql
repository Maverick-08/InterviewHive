-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "yearOfInterview" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "CTCOffered" INTEGER,
    "interviewStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewRound" (
    "id" TEXT NOT NULL,
    "roundType" TEXT NOT NULL,
    "note" TEXT,
    "interviewId" TEXT NOT NULL,

    CONSTRAINT "InterviewRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "roundId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InterviewTag" (
    "tagId" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "InterviewTag_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "_InterviewToInterviewTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InterviewToInterviewTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewRound_interviewId_key" ON "InterviewRound"("interviewId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_roundId_key" ON "Question"("roundId");

-- CreateIndex
CREATE INDEX "_InterviewToInterviewTag_B_index" ON "_InterviewToInterviewTag"("B");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewRound" ADD CONSTRAINT "InterviewRound_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "InterviewRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterviewToInterviewTag" ADD CONSTRAINT "_InterviewToInterviewTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterviewToInterviewTag" ADD CONSTRAINT "_InterviewToInterviewTag_B_fkey" FOREIGN KEY ("B") REFERENCES "InterviewTag"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;
