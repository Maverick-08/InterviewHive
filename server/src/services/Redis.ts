import redisClient from "../config/redis-config";

export class Redis_Service {
  // Key : "Token:<platform>:<user id>"
  // value : JSON String({token,issuedAt})

  public static async doesSessionExists(
    userId: string,
    platform: "Mobile" | "Tablet" | "Laptop"
  ) {
    return await redisClient.get(`Token:${platform}-${userId}`);
  }

  public static async createSession({
    token,
    userId,
    platform,
  }: {
    token: string;
    userId: string;
    platform: "Mobile" | "Tablet" | "Laptop";
  }) {
    // cache the access token
    return await redisClient.set(
      `Token:${platform}-${userId}`,
      JSON.stringify({ token, issuedAt: new Date() }),
      "EX",
      30 * 24 * 60 * 60
    );
  }

  public static async clearSession({
    userId,
    platform,
  }: {
    userId: string;
    platform: "Mobile" | "Tablet" | "Laptop";
  }) {
    await redisClient.del(`Token:${platform}-${userId}`);

    return;
  }

  public static async terminateAllSessions({ userId }: { userId: string }) {
    await Promise.allSettled([
      redisClient.del(`Token:Mobile-${userId}`),
      redisClient.del(`Token:Laptop-${userId}`),
      redisClient.del(`Token:Tablet-${userId}`),
    ]);
    return;
  }

  public static async getActiveUsersCount() {
    try {
      const pattern = "Token:*";
      const stream = redisClient.scanStream({ match: pattern });
      const allData: Record<string, any> = {};
      let count = 0;

      for await (const keys of stream) {
        if (keys.length) {
          const values = await redisClient.mget(...keys);
          (keys as string[]).forEach((key: string, i: number) => {
            try {
              allData[key] = JSON.parse(values[i] ?? "");
              const tokenIssueTime = new Date(allData[key].issuedAt).getTime();
              const currentTime = new Date().getTime();
              const timeDiff =
                (currentTime - tokenIssueTime) / (1000 * 60 * 60);
              if (timeDiff < 60) ++count;
            } catch {
              allData[key] = values[i];
            }
          });
        }
      }

      return count;
    } catch (err) {
      console.log("@getActiveUsersCount \n" + err);
      return 0;
    }
  }

  public static async getTotalViews() {
    const viewCount = await redisClient.get("TotalViews");
    if (!viewCount) {
      return "No view count";
    } else {
      const parsedValue = parseInt(viewCount);
      const thousandsCount = Math.floor(parsedValue / 1000);
      const hundredsCount = Math.floor((parsedValue - thousandsCount * 1000) / 100);
      if (thousandsCount == 0 && hundredsCount >= 0) {
        return `${parsedValue}`;
      }

      return `${thousandsCount}.${hundredsCount} K`;
    }
  }

  public static async setTotalViews() {
    const lastViewCount = await redisClient.get("TotalViews");
    if (!lastViewCount) {
      redisClient.set("TotalViews", 1);
    } else {
      const parsedValue = parseInt(lastViewCount);
      redisClient.set("TotalViews", parsedValue + 1);
      console.log("Increasing Views : ", parsedValue);
    }
    return;
  }

  public static async getInterviewViewCount(interviewId:string){
    return await redisClient.get(`Interview:${interviewId}`);
  }

  public static async setInterviewViewCount(interviewId:string,value:number){
    return await redisClient.set(`Interview:${interviewId}`,JSON.stringify({viewCount:value,bookmarkCount:0}));
  }
}
