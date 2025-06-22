import redisClient from "../config/redis-config";

export class Redis_Service {
  // Token maps to userId : give token get user I
  // userId maps to Array of tokens (each issued for different device)

  public static async doesSessionExists(
    userId: string,
    platform: "Mobile" | "Tablet" | "Laptop"
  ) {
    return await redisClient.get(`${platform}:${userId}`);
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
    await redisClient.set(
      `${platform}:${userId}`,
      JSON.stringify({ token, issuedAt: new Date() }),
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
    redisClient.del(`${platform}:${userId}`);

    return;
  }

  public static async terminateAllSessions({ userId }: { userId: string }) {
    await Promise.allSettled([
      redisClient.del(`Mobile:${userId}`),
      redisClient.del(`Laptop:${userId}`),
      redisClient.del(`Tablet:${userId}`),
    ]);
    return;
  }

  public static async getActiveUsersCount() {
    const doesActiveUsersCountExists = await redisClient.get("activeUsers");
    if (!doesActiveUsersCountExists) {
      let cursor = "0";
      let count = 0;

      do {
        const [nextCursor, keys] = await redisClient.scan(cursor);
        cursor = nextCursor;

        for (let key of keys) {
          const token = await redisClient.get(key);
          if (token) {
            const parsedToken = JSON.parse(token);
            const lastIssuedTime = new Date(parsedToken.issuedAt).getTime();
            const currentTime = new Date().getTime();
            const timeDiff = ((currentTime - lastIssuedTime) / 1000) * 60 * 60;

            if (timeDiff < 60) ++count;
          }
        }
      } while (cursor !== "0");

      redisClient.set("activeUsers", count, "EX", 60 * 60);
      return count;
    } else {
      return parseInt(doesActiveUsersCountExists);
    }
  }
}
