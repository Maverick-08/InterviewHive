import { NextFunction, Request, Response } from "express";
import { code } from "../config/status-code";
import { refreshTokenHandler } from "../controllers/controller.refreshToken";
import { isAccessTokenValid, isRefreshTokenValid } from "../utils/utils.tokens";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include userId
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // 1. Get cookies
  const tokens = req.cookies;

  // 2. Extract tokens
  const accessToken = tokens["__accessToken__"];
  const refreshToken = tokens["__refreshToken__"];

  // 3. Extact userId and platform
  const { userId, platform } = jwt.decode(accessToken) as jwt.JwtPayload;

  // 4. check whether the tokens are still valid - not tampered
  const accessTokenState = isAccessTokenValid({ token: accessToken });
  const refreshTokenState = isRefreshTokenValid({ token: refreshToken });
  if (!(accessTokenState.valid && refreshTokenState.valid)) {
    // If tokens have been tampered - return
    res.status(code.Unauthorized).json({ msg: "Tampered Tokens" });
    return;
  }
  // 5. If tokens are valid
  else {
    // 6. Check access token expiry
    if (!accessTokenState.expired) {
      // If access token has not expired

      // A. Set userId on req object
      req.userId = userId;

      // B. Call next()
      next();
    } else {
      // If access token has expired

      // A. Call refresh tken handler;
      refreshTokenHandler(req, res, next, userId, platform);
    }
  }
};

export default verifyToken;
