import { Request, Response } from "express";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { code } from "../config/status-code";
import { User } from "../services/User";
import {
    checkToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../utils/utils.tokens";
import { Redis_Service } from "../services/Redis";

export const refreshTokenHandler = async (req: Request, res: Response) => {
  try {
    // 1. Get token
    const token = req.cookies;
    const { userId } = req.body;

    // 2. Extract refresh token
    const oldRefreshToken = token["__refreshToken__"];

    // A. API request has token and userId
    if (oldRefreshToken && userId) {
      
      const isTokenValid = checkToken({token:oldRefreshToken});
      const doesSessionExists = await Redis_Service.getSession({token:oldRefreshToken});


      // A-1. Check if token is valid and exists in cache - Normal flow
      if (isTokenValid && doesSessionExists) {
        // 1. create new pair of tokens
        const newAccessToken = getAccessToken({ userId });
        const newRefreshToken = getRefreshToken({ userId });

        // 2. Invalidate cache and cookie
        // del old token
        await Redis_Service.clearSession({token:oldRefreshToken,userId});
        res.clearCookie("__accessToken__"); // clear access cookie
        res.clearCookie("__refreshToken__"); // clear refresh cookie

        // 3. Hydrate cache and cookie
        await Redis_Service.setSession({ token: newRefreshToken, userId });
        setAccessToken(res, newAccessToken);
        setRefreshToken(res, newRefreshToken);

        res.status(code.SuccessNoContent).send();
        return;
      }

      // A-2 if token is valid but does not exist in cache - compromise
      else if(isTokenValid && !doesSessionExists){
        // terminate all sessions associated with that userId
        await Redis_Service.terminateSession({token:oldRefreshToken,userId});
        res.status(code.Unauthorized).json({msg:"Account compromised"});
        return;
      }

      // A-3 if token is invalid - ask user to login again
      else {
        res.status(code.Unauthorized).json({msg:"Refresh token is invalid."});
        return;
      }
    }
    else if(!userId){
      res.status(code.BadRequest).json({msg:"User id is missing"});
      return;
    }
    else{
      res.status(code.BadRequest).json({msg:"Refresh token is missing"});
      return;
    }
 
  } catch (err) {
    const errMsg = handleError(err, services["User-Authentication"]);
    res.status(code.Unauthorized).json({ msg: errMsg });
    return;
  }
};
