-- CreateTable
CREATE TABLE "DashboardStats" (
    "id" TEXT NOT NULL,
    "previousInterviewCount" INTEGER NOT NULL,
    "currentInterviewCount" INTEGER NOT NULL,
    "interviewCountGrowthPercentage" INTEGER NOT NULL,
    "previousUserCount" INTEGER NOT NULL,
    "currentUserCount" INTEGER NOT NULL,
    "userCountGrowthPercentage" INTEGER NOT NULL,
    "previousTotalViews" BIGINT NOT NULL,
    "currentTotalViews" BIGINT NOT NULL,
    "totalViewsGrowthPercentage" INTEGER NOT NULL,
    "activeUserCount" INTEGER NOT NULL,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DashboardStats_pkey" PRIMARY KEY ("id")
);
