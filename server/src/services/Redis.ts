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
    tokenId,
  }: {
    token: string;
    userId: string;
    platform: "Mobile" | "Tablet" | "Laptop";
    tokenId: string;
  }) {
    // cache the access token
    await redisClient.set(
      `Token:${platform}-${userId}`,
      JSON.stringify({ token, issuedAt: new Date(), tokenId }),
      "EX",
      30 * 24 * 60 * 60
    );

    return;
  }

  public static async clearSession({
    userId,
    platform,
  }: {
    userId: string;
    platform: "Mobile" | "Tablet" | "Laptop";
  }) {
    redisClient.del(`Token:${platform}-${userId}`);

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
}
