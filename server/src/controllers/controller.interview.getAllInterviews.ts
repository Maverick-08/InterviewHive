import { Request,Response } from "express";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { code } from "../config/status-code";
import { Interview } from "../services/Interview";
import z from "zod";

const QuerySchema = z.object({
  page: z.string().optional().default('1').transform(val => {
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 1) throw new Error("Invalid page number.");
    return num;
  }),
  limit: z.string().optional().default('10').transform(val => {
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 1) throw new Error("Invalid limit number.");
    return num;
  }),
  companyName: z.string().optional()
});

export const getAllInterviewsController = async (req:Request,res:Response) => {
    try{
        
        const parsedQuery = QuerySchema.safeParse(req.query);

        if(!parsedQuery.success){
            res.status(code.BadRequest).json({msg:"Invalid query parameters."});
            return;
        }

        const {page,limit,companyName} = parsedQuery.data;

        const result = await Interview.getAllInterviews(page,limit,companyName);

        res.status(code.Success).json({data:result.data,totalCount:result.totalCount});
        return;
    }
    catch(err){
        const errMsg = handleError(err,services.Interview);
        res.status(code.ServerError).json({msg:errMsg});
        return;
    }
}