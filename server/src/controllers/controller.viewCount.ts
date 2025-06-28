import { Request, Response } from "express";
import { Redis_Service } from "../services/Redis";
import { code } from "../config/status-code";

export const viewCountHandler = async (req:Request, res:Response) => {
    try{
        Redis_Service.setTotalViews();
        res.status(code.SuccessNoContent).send();
    }
    catch(err){
        console.log("@controller.viewCounts \n",err);
        res.status(code.ServerError).send("Failed to set view count");
    }
    return;
}