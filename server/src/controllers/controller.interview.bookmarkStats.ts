import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { code } from "../config/status-code";

const prisma = new PrismaClient();

export const getBookmarkStats = async (req:Request, res:Response) => {
    try{
        // 1. Extract user id
        const userId = req.userId;

        // 2. Count number of bookmarks made today
        const date = (new Date()).getDate();
        const month = (new Date()).getMonth();
        const year = (new Date()).getFullYear();
        let count = 0;

        const interviewData = await prisma.savedInterview.findMany({
            where:{
                userId
            }
        });

        for( let data of interviewData){
            const savedDate = (new Date(data.savedAt)).getDate();
            const savedMonth = (new Date(data.savedAt)).getMonth();
            const savedYear = (new Date(data.savedAt)).getFullYear();

            if(date == savedDate && month == savedMonth && year == savedYear) ++count;
        }

        res.json({count});
        return;
    }
    catch(err){
        console.log("@getBookmarkStats : \n",err);
        res.status(code.ServerError).send();
        return;
    }
}