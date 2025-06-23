import { NextFunction, Request, Response } from "express";
import { code } from "../config/status-code";
import { Redis_Service } from "../services/Redis";
import {
  getAccessToken,
  getRefreshToken,
  isRefreshTokenValid,
  setAccessToken,
  setRefreshToken,
} from "../utils/utils.tokens";

// const BUFFERED_TIME = 5 * 60 * 1000;

export const refreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  userId: string,
  platform: "Mobile" | "Tablet" | "Laptop"
) => {
  // Access token has been expired and a new pair of token has to be generated using valid refresh token.
  // A. If the refresh token on req object has expired - clear cache - return
  // B. If the refresh token on req bject has not expired
  // Check Cache
  // 1. The token exists in cache - match tokens
  // a. Token matched - clear cache - set new tokens(token rotation)
  // b. Token did not matched - Account Compromised - terminate all session.
  // 2. The token does not exists in cache - cache has been cleared or expired.

  // 1. Get refresh token
  const refreshToken = req.cookies["__refreshToken__"];

  // 2. Check for expiry
  const refreshTokenState = isRefreshTokenValid({ token: refreshToken });

  // 3. If refresh token has expired
  if (refreshTokenState.expired) {
    // Clear cache
    await Redis_Service.clearSession({ userId, platform });

    // Return
    res.status(code.Unauthorized).json({ msg: "Session Expired" });
    return;
  }
  // 4. If refresh token has not expired
  else {
    // 5. Check cache
    const cachedData = await Redis_Service.doesSessionExists(userId, platform);

    // 6. If cached token does not exists
    if (!cachedData) {
      // Return
      res.status(code.Unauthorized).json({ msg: "Session Expired" });
      return;
    }
    // 7. Cached token exists
    else {
      // Get token
      const cachedToken = JSON.parse(cachedData)["token"];

      // 8. Compare tokens
      // If tokens do not match - Account compromised
      if (refreshToken !== cachedToken) {
        // Return
        res.status(code.Unauthorized).json({ msg: "Account Compromised" });
        return;
      }
      // If tokens match - rotate tokens
      else {
        // Clear old cache
        await Redis_Service.clearSession({ userId, platform });

        // Get new tokens
        const newRefreshToken = getRefreshToken({ userId, platform });
        const newAccessToken = getAccessToken({ userId, platform });

        // Hydrate Cache
        await Redis_Service.createSession({
          token: newRefreshToken,
          userId,
          platform,
        });

        // Set cookie
        setAccessToken(res, newAccessToken);
        setRefreshToken(res, newRefreshToken);

        // Call next
        next();
      }
    }
  }
};
