import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { code } from "../config/status-code";

const prisma = new PrismaClient();

export const getInterviewTags = async (req:Request,res:Response) => {
    try{
        const response = await prisma.interviewTag.findMany();
        res.status(code.Success).json({data:response});
        return;
    }
    catch(err){
        console.log("@getInterviewTags : \n",err);
        res.status(code.ServerError).json({msg:"Failed to fetch interview tags."});
        return;
    }
}