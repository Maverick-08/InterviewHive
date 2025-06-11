import { NextFunction, Request, Response } from "express";
import { code } from "../config/status-code";
import jwt from "jsonwebtoken"
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;

// Extend Express Request interface to include userId
declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
    }
}

const verifyToken = (req:Request,res:Response,next:NextFunction) => {
    try{
        const {__accessToken__} = req.cookies;

        if(__accessToken__ && ACCESS_TOKEN_KEY){
            const decoded = jwt.verify(__accessToken__,ACCESS_TOKEN_KEY) as jwt.JwtPayload;

            const userId = decoded?.["userId"];
            console.log(userId);

            req["userId"] = userId;
            next();
        }
        else{
            res.status(code.BadRequest).json({msg:"Access token is missing"});
            return;
        }
        
    }
    catch(err){
        res.status(code.Unauthorized).json({msg:"Invalid access token."});
        return;
    }
}

export default verifyToken;