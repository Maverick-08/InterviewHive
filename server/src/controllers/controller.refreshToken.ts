import { NextFunction, Request, Response } from "express";
import { code } from "../config/status-code";
import {
  checkToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../utils/utils.tokens";
import { Redis_Service } from "../services/Redis";

export const refreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  userId: string
) => {
  try {
    // 1. Get token
    const token = req.cookies;

    // 2. Extract refresh token
    const oldRefreshToken = token["__refreshToken__"];

    // A. API request has token and userId
    if (oldRefreshToken && userId) {
      const isTokenValid = checkToken({ token: oldRefreshToken });
      const doesSessionExists = await Redis_Service.getSession({
        token: oldRefreshToken,
      });

      // A-1. Check if token is valid and exists in cache - Normal flow
      if (isTokenValid && doesSessionExists) {
        // 1. create new pair of tokens
        const newAccessToken = getAccessToken({ userId });
        const newRefreshToken = getRefreshToken({ userId });

        // 2. Invalidate cache and cookie
        // del old token
        await Redis_Service.clearSession({ token: oldRefreshToken, userId });
        res.clearCookie("__accessToken__"); // clear access cookie
        res.clearCookie("__refreshToken__"); // clear refresh cookie

        // 3. Hydrate cache and cookie
        await Redis_Service.setSession({ token: newRefreshToken, userId });
        setAccessToken(res, newAccessToken);
        setRefreshToken(res, newRefreshToken);

        next();
      }

      // A-2 If token is valid but does not exist in cache - compromise
      else if (isTokenValid && !doesSessionExists) {
        // terminate all sessions associated with that userId
        await Redis_Service.terminateSession({
          token: oldRefreshToken,
          userId,
        });
        res.status(code.Unauthorized).json({ msg: "Account is compromised" });
        return;
      }

      // A-3 If token is invalid  - clear token & ask user to login again
      else {
        await Redis_Service.clearOldToken(userId,oldRefreshToken);
        res
          .status(code.Unauthorized)
          .json({ msg: "Session Expired" });
        return;
      }
    } else if (!oldRefreshToken) {
      res.status(code.Unauthorized).json({ msg: "Something went wrong" });
      return;
    } else {
      res.status(code.BadRequest).json({ msg: "Invalid payload" });
      return;
    }
  } catch (err) {
    res.status(code.ServerError).json({ msg:"Internal Server Error"});
    return;
  }
};
