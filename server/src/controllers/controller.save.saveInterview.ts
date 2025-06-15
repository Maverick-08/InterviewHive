import {Request,Response} from "express";
import { code } from "../config/status-code";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveInterviewController = async (req:Request,res:Response) => {
    try{
        const payload = req.query as unknown as {interviewId:string};

        if(!payload.interviewId){
            res.status(code.BadRequest).json({msg:"Interview id is missing."});
            return;
        }
        // 1. get user id
        const userId = req.userId as string;

        // 2. get interview id
        const interviewId = payload.interviewId as string;

        // 3. check if interview id exists or not
        const doesInterviewExists = await prisma.interview.findFirst({
            where:{
                id:interviewId
            }
        })

        // 4. if the record does not exists
        if(!doesInterviewExists){
            res.status(code.BadRequest).json({msg:"Invalid interview id"});
            return;
        }

        // 5. if interview exists - save it (if not exists) delete it(if exists)
        const isInterviewSaved = await prisma.savedInterview.findFirst({
            where:{
                userId,
                interviewId
            }
        })

        // 6. If it is saved - then delete it
        if(isInterviewSaved){
            await prisma.savedInterview.delete({
                where: {
                    userId_interviewId: {
                        userId,
                        interviewId
                    }
                }
            })
        }

        // 7. if it is not saved then save it
        await prisma.savedInterview.create({
            data:{
                userId,
                interviewId
            }
        });

        res.status(code.SuccessNoContent).send();
        return;
    }
    catch(err){
        console.log("@saveInterview : \n",err);
        res.status(code.ServerError).json({msg:"Internal Server Error"});
        return;
    }
}