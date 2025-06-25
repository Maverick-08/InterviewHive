import { Request, Response} from "express";
import { code } from "../config/status-code";
import { Redis_Service } from "../services/Redis";
import jwt from "jsonwebtoken";
import {
  getAccessToken,
  getRefreshToken,
  isRefreshTokenValid,
  setAccessToken,
  setRefreshToken,
} from "../utils/utils.tokens";

const GRACE_PERIOD = 5

export const refreshTokenHandler = async (req: Request, res: Response) => {
  // If Access token is expired new pair of token has to be generated using a valid refresh token.
  // A. If the refresh token on req object has expired - clear cache - return
  // B. If the refresh token on req bject has not expired
  // Check Cache
  // 1. The token exists in cache - match tokens
  // a. Token matched - clear cache - set new tokens(token rotation)
  // b. Token did not matched - Account Compromised - terminate all session.
  // 2. The token does not exists in cache - cache has been cleared or expired.
console.log("Path: ",req.originalUrl)
  // 1. Get refresh token
  const refreshToken = req.cookies["__refreshToken__"];

  // 2. Token check
  const refreshTokenState = isRefreshTokenValid({ token: refreshToken });

  // 3. If token is tampered
  if (!refreshTokenState.valid) {
    res.status(code.Unauthorized).json({ msg: "Refresh token is tampered.",info:"Refresh token tampered" });
    return;
  }
  // 4. If refresh token has expired
  else if (refreshTokenState.expired) {
    // Return
    res.status(code.Unauthorized).json({ msg: "Session Expired",info:"Refresh token expired" });
    return;
  }
  // 5. If refresh token has not expired
  else {
    // 5. Decode request object token
    const { userId, platform, tokenId } = jwt.decode(
      refreshToken
    ) as jwt.JwtPayload;

    // 6. Check if cached token against (platform,userId) exists
    const cachedData = await Redis_Service.doesSessionExists(userId, platform);

    // 7. If cached token does not exists
    if (!cachedData) {
      // Return
      res.status(code.Unauthorized).json({ msg: "Session Expired",info:"Cached data dos not exists" });
      return;
    }
    // 8. Cached token exists
    else {
      try {
        // 9. Get parsed token object
        const { token: cachedToken, issuedAt } = JSON.parse(cachedData);

        const tokenIssueTime = (new Date(issuedAt)).getTime() // Time in ms
        const currentTime = (new Date()).getTime() // Current time in ms
        const timeDiff = (currentTime - tokenIssueTime)/1000 // Time in secs

        if(timeDiff < GRACE_PERIOD){
          console.log("Time Diff : ",timeDiff," Grace Period : ",10);
          res.status(code.SuccessNoContent).send("The new token has been set. Try again with that.");
          return;
        }

        // 10. Match token Ids
        // If tokens do not match - Account compromised
        else if (refreshToken !== cachedToken) {
          // Return
          res.status(code.Unauthorized).send("Account Compromised");
          return;
        }
        // If tokens match - rotate tokens
        else {
          // Clear old cache
          await Redis_Service.clearSession({ userId, platform });

          // Get new tokens
          const newRefreshToken = getRefreshToken({
            userId,
            platform,
          });
          const newAccessToken = getAccessToken({ userId });

          // Hydrate Cache
          await Redis_Service.createSession({
            token: newRefreshToken,
            userId,
            platform,
          });

          // Set cookie
          setAccessToken(res, newAccessToken);
          setRefreshToken(res, newRefreshToken);

          // Return
          res.status(code.Success).send("Token Rotated");
          return;
        }
      } catch (err) {
        console.log("@controller.refreshToken\n", err);
        res.status(code.ServerError).json({ msg: "Server Error" });
        return;
      }
    }
  }
};