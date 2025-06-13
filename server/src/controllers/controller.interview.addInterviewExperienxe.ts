import { Request,Response } from "express";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { code } from "../config/status-code";
import { Interview, InterviewDetails } from "../services/Interview";

export const addInterviewsController = async (req:Request,res:Response) => {
    try{
        const payload:InterviewDetails = req.body;

        await Interview.addInterviewExperience(payload);

        res.status(code.Success).json({msg:"Interview experience added successfully!"});
        return;
    }
    catch(err){
        const errMsg = handleError(err,services.Interview);
        res.status(code.ServerError).json({msg:errMsg});
        return;
    }
}