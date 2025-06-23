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

const BUFFERED_TIME = 5 * 60 * 1000;

export const refreshTokenHandler = async (
  req: Request,
  res: Response,
  userId: string,
  platform: "Mobile" | "Tablet" | "Laptop"
) => {
  // Access token has been expired and a new pair of token has to be generated using valid refresh token.
  // 1. The old token exists in cache - clear - generate new tokens - hydrate cache
  // 2. The old token does not exists in cache - session expired
  // 3. The issue time of new token is less than the buffered time. - multiple token generations - possible account breach - terminate all sessions.

  // 1. Get token
  const token = req.cookies;

  // 2. Extract tokens
  const __refreshToken__ = token["__refreshToken__"];

  // 3. Check refresh token validity
  const isTokenValid = isRefreshTokenValid({token:__refreshToken__});

  // 4. If token is tampered
  if(!isTokenValid.valid){
    res.status(code.Unauthorized).json({msg:"Refresh Token Tampered"});
    return;
  }

  // 5. If token is expired
  if(isTokenValid.valid && isTokenValid.expired){
    res.status(code.Unauthorized).json({msg:"Session Expired. Login Again!"});
    return;
  }

  // If refresh token has not expired
  // 6. Check cache
  const userSession = await Redis_Service.doesSessionExists(userId, platform);

  // 7. If user session exists - check for compromise
  if (userSession) {
    // A. Check issue time
    const { issuedAt }: { token: string; issuedAt: Date } =
      JSON.parse(userSession);
    const currentTime = new Date();

    // B. Check time difference
    const timeDiff = currentTime.getTime() - new Date(issuedAt).getTime();

    // C. If last issued time is less than the buffered time - compromise
    const isAccountCompromised = timeDiff < BUFFERED_TIME;

    if (isAccountCompromised) {
      // D. Terminate all sessions
      await Redis_Service.terminateAllSessions({ userId });
      res.status(code.Unauthorized).json({ msg: "Account Compromised !" });
      return;
    } else {
      // E. clear old session
      await Redis_Service.clearSession({ userId, platform });

      // F. get new access token
      const newAccessToken = getAccessToken({ userId, platform });

      // G. get new refresh token
      const newRefreshToken = getRefreshToken({ userId, platform });

      // H. Hydrate cache
      await Redis_Service.createSession({
        token: newRefreshToken,
        userId,
        platform,
      });

      // I. Set tokens on response header
      setAccessToken(res, newAccessToken);
      setRefreshToken(res, newRefreshToken);

      return;
    }
  }

  // 5. If user session does not exists - session expired
  else {
    res.status(code.Unauthorized).json({ msg: "Session Expired" });
    return;
  }
};
