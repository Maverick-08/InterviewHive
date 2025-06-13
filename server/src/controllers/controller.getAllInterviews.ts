import { Request,Response } from "express";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { code } from "../config/status-code";
import { Interview } from "../services/Interview";

export const getAllInterviewsController = async (req:Request,res:Response) => {
    try{
        const payload = req.query;
        const page = payload.page ? Number(payload.page) : null;
        const limit = payload.limit ? Number(payload.limit) : null;

        if(!page || !limit){
            throw new Error("Invalid URL")
        }

        const result = await Interview.getAllInterviews(page,limit);

        res.status(code.Success).json({data:result});
        return;
    }
    catch(err){
        const errMsg = handleError(err,services.Interview);
        res.status(code.ServerError).json({msg:errMsg});
        return;
    }
}