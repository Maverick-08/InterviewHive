import { NextFunction, Request, Response } from "express";
import { code } from "../config/status-code";
import jwt from "jsonwebtoken";
import { refreshTokenHandler } from "../controllers/controller.refreshToken";
import { getAccessToken, setAccessToken } from "../utils/utils.tokens";
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;

// Extend Express Request interface to include userId
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { __accessToken__ } = req.cookies;
  if (__accessToken__ && ACCESS_TOKEN_KEY) {
    try {
      // 1. Extract payload
      const decoded = jwt.verify(
        __accessToken__,
        ACCESS_TOKEN_KEY
      ) as jwt.JwtPayload;

      // 2. Get userId
      const userId = decoded?.["userId"];

      // 3. set userId on request object
      req["userId"] = userId;
      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        const decode = jwt.decode(__accessToken__) as jwt.JwtPayload;
        const userId = decode["userId"];

        // Get new pair of tokens
        if (userId){
          const newAccessToken = getAccessToken({userId});
          setAccessToken(res,newAccessToken);
          refreshTokenHandler(req, res, next, userId);
          return;
        }
        else {
          res
            .json(code.Unauthorized)
            .json({ msg: "Access token does not contain user Id" });
          return;
        }
      }

      res.status(code.Unauthorized).json({ msg: "Session expired" });
      return;
    }
  } else {
    res.status(code.Unauthorized).json({ msg: "Access token is missing" });
    return;
  }
};

export default verifyToken;
