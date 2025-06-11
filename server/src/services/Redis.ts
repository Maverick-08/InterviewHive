import redisClient from "../config/redis-config";

export class Redis_Service {
  // Token maps to userId : give token get user I
  // userId maps to Array of tokens (each issued for different device)

  public static async getSession({ token }: { token: string }) {
    return redisClient.get(token);
  }

  public static async setSession({
    token,
    userId,
  }: {
    token: string;
    userId: string;
  }) {
    // cache the token
    await redisClient.set(token, userId, "EX", 30 * 24 * 60 * 60);

    // check if tokens array exist
    const doestokensArrayExist = await redisClient.get(userId);

    // if not - first time login
    if (!doestokensArrayExist) {
      const tokensArray = [token];
      await redisClient.set(
        userId,
        JSON.stringify(tokensArray),
        "EX",
        30 * 24 * 60 * 60
      );
    } else {
      const tokensArray = JSON.parse(doestokensArrayExist);
      await redisClient.set(
        userId,
        JSON.stringify([...tokensArray, token]),
        "EX",
        30 * 24 * 60 * 60
      );
    }

    return;
  }

  public static async clearSession({
    token, // old token
    userId,
  }: {
    token: string;
    userId: string;
  }) {
    const tokensArray = JSON.parse(
      (await redisClient.get(userId)) as string
    ) as string[];
    const filteredTokens = tokensArray.filter(
      (currToken) => currToken != token
    );

    await Promise.allSettled([
      redisClient.del(token),
      redisClient.set(
        userId,
        JSON.stringify(filteredTokens),
        "EX",
        30 * 24 * 60 * 60
      ),
    ]);

    return;
  }

  public static async terminateSession({
    token,
    userId,
  }: {
    token: string;
    userId: string;
  }) {
    await Promise.allSettled([redisClient.del(token), redisClient.del(userId)]);
    return;
  }
}
