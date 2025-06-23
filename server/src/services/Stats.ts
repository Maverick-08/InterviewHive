import { PrismaClient } from "@prisma/client";
import { Redis_Service } from "./Redis";
import redisClient from "../config/redis-config";

const prisma = new PrismaClient();

export class Stats {
  public static async getDashboardStats() {
    const doesDashboardStatsExist = await redisClient.get("DashboardStats");
    if (!doesDashboardStatsExist) {
      const [
        totalInterviews,
        totalUsers,
        totalSelectedCandidates,
        totalCompanies,
        interviewViewsArray,
        activeUsers,
      ] = await Promise.all([
        prisma.interview.count(),
        prisma.user.count(),
        prisma.interview.count({
          where: {
            interviewStatus: "SELECTED",
          },
        }),
        prisma.interview.groupBy({
          by: ["companyName"],
        }),
        prisma.interview.findMany({
          select: {
            viewCount: true,
          },
        }),
        Redis_Service.getActiveUsersCount(),
      ]);

      // calculate success percentage
      const successPercentage =
        totalInterviews > 0
          ? Math.floor((totalSelectedCandidates / totalInterviews) * 100)
          : 0;

      // calculate total view counts
      let totalViews = 0;
      for (let { viewCount } of interviewViewsArray) {
        totalViews += Number(viewCount);
      }

      redisClient.set(
        "DashboardStats",
        JSON.stringify({
          totalInterviews,
          totalUsers,
          successPercentage,
          totalCompanies: totalCompanies.length,
          totalViews,
          activeUsers,
        }),
        'EX',
        2*60
      );

      return {
        totalInterviews,
        totalUsers,
        successPercentage,
        totalCompanies: totalCompanies.length,
        totalViews,
        activeUsers,
      };
    } else {
      const stats = JSON.parse(doesDashboardStatsExist);
      return {
          totalInterviews:stats.totalInterviews,
          totalUsers:stats.totalUsers,
          successPercentage:stats.successPercentage,
          totalCompanies: stats.totalCompanies,
          totalViews:stats.totalViews,
          activeUsers:stats.activeUsers,
        }
    }
  }

  public static async getTrendingTopicsStats() {
    const totalInterviews = await prisma.interview.count();
    const response = await prisma.interviewTopicTag.findMany({
      select: {
        tagInitials: true,
        tagName: true,
        interviews: {
          select: {
            id: true,
          },
        },
      },
    });

    const topicTagCount: {
      tagInitials: string;
      tagName: string;
      count: number;
      prcentage: number;
    }[] = [];

    for (let data of response) {
      const count = data.interviews.length;
      topicTagCount.push({
        tagInitials: data.tagInitials,
        tagName: data.tagName,
        count: data.interviews.length,
        prcentage:
          totalInterviews > 0 ? Math.floor((count / totalInterviews) * 100) : 0,
      });
    }

    topicTagCount.sort((a, b) => b.count - a.count);

    return topicTagCount.slice(0, 7);
  }
}
