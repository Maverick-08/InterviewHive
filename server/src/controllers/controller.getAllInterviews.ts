import { Request,Response } from "express";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { code } from "../config/status-code";

export const getAllInterviewsController = async (req:Request,res:Response) => {
    try{

    }
    catch(err){
        const errMsg = handleError(err,services.Interview);
        res.status(code.ServerError).json({msg:errMsg});
        return;
    }
}