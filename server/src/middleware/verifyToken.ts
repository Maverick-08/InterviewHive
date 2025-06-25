import { NextFunction, Request, Response } from "express";
import { isAccessTokenValid } from "../utils/utils.tokens";
import jwt from "jsonwebtoken";
import { code } from "../config/status-code";

// Extend Express Request interface to include userId
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // 1. Get cookies
  const token = req.cookies;

  // 2. Extract token
  const accessToken = token["__accessToken__"];

  // 3. check whether the tokens are still valid - not tampered
  const accessTokenState = isAccessTokenValid({ token: accessToken });

  // 4. Check is token tampered or expired
  if (!accessTokenState.valid) {
    // If token is tampered
    res.status(code.Unauthorized).json({ msg: "Access token is tampered" });
    return;
  } else if (accessTokenState.expired) {
    // If token is expired
    res.status(code.Unauthorized).json({ msg: "Session Expired" });
    return;
  } else {
    //Token is valid
    const { userId } = jwt.decode(accessToken) as jwt.JwtPayload;
    req.userId = userId;
    next();
  }
};

export default verifyToken;
