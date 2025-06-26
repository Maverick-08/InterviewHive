import { Request,Response } from "express";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { code } from "../config/status-code";
import { Interview, InterviewDetails } from "../services/Interview";
import { createKnowledgeBase } from "../scripts/script.createKnowledgeBase";

export const addInterviewsController = async (req:Request,res:Response) => {
    try{
        const payload:InterviewDetails = req.body;

        const response = await Interview.addInterviewExperience(payload);

        createKnowledgeBase(response.id).catch((err) => console.log("Async Task Failed"));

        res.status(code.Success).json({msg:"Interview experience added successfully!"});
        return;
    }
    catch(err){
        const errMsg = handleError(err,services.Interview);
        res.status(code.ServerError).json({msg:errMsg});
        return;
    }
}