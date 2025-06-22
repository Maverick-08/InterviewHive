import { NextFunction, Request, Response } from "express";
import { code } from "../config/status-code";
import { refreshTokenHandler } from "../controllers/controller.refreshToken";
import { isAccessTokenValid } from "../utils/utils.tokens";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include userId
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { __accessToken__, __refreshToken__ } = req.cookies;
  const { userId, platform } = jwt.decode(__accessToken__) as jwt.JwtPayload;

  // If access token and refresh token exists
  if (__accessToken__ && __refreshToken__ && userId && platform) {
    // CASE A : If access token is valid and has not expired : call next
    let response = isAccessTokenValid(__accessToken__);
    if (response.valid && !response.expired) {
      // 1. set user id on request object
      req.userId = userId;

      // 2. call next
      next();
    }

    // CASE B : If access token is valid and has expired
    // 1. The refersh token exists in cache - rotate tokens
    // 2. The refresh token does not exists in cache - account compromise / session expired
    if (response.valid && response.expired) {
      refreshTokenHandler(req, res, next, userId, platform);
    }

    // CASE C : If access token is tampered
    res.status(code.Unauthorized).json({ msg: "Tampered token" });
    return;
  } else {
    res
      .status(code.Unauthorized)
      .json({ msg: "Access token or Refresh token is missing" });
  }
};

export default verifyToken;
