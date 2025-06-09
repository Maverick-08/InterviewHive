-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "yearOfPassingOut" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'Doodle',
    "course" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "xHandle" TEXT,
    "linkedIn" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "course" TEXT NOT NULL,
    "branch" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course","branch")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_course_branch_fkey" FOREIGN KEY ("course", "branch") REFERENCES "Course"("course", "branch") ON DELETE RESTRICT ON UPDATE CASCADE;
