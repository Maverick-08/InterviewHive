import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { code } from "../config/status-code";

const prisma = new PrismaClient();

export const addReviewHandler = async (req:Request,res:Response) => {
    try{
        const {message} = req.body as {message:string};

        if(!message){
            res.status(code.BadRequest).json({msg:"No message added"});
            return;
        }

        const msgLength = message.split(" ").length;

        if(msgLength < 3){
            res.status(code.BadRequest).json({msg:"Message length is too short"});
            return;
        }

        await prisma.feedback.create({
            data:{
                message
            }
        })

        res.status(code.Success).json({data:"Thank you for your feedback"});
        return;
    }
    catch(err){
        console.log("@addReview : \n",err);
        res.status(code.ServerError).json({msg:"Failed to add review. Try again later."});
        return;
    }
}