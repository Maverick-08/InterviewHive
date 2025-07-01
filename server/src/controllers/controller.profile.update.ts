import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { code } from "../config/status-code";

const prisma = new PrismaClient();

export const profileUpdateController = async (req:Request,res:Response) => {
    try{
        const {username,courseId,yearOfPassingOut,xHandle,linkedIn} = req.body as {username:string,courseId:string,yearOfPassingOut:string,xHandle:string,linkedIn:string}

        const userId = req.userId;

        await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                username: username ?? undefined,
                yearOfPassingOut:parseInt(yearOfPassingOut) ?? null,
                xHandle: xHandle ?? null,
                linkedIn: linkedIn ?? null,
                course_branch:{
                    connect:{
                        courseInitials:courseId
                    }
                }
            }
        })

        const contentAccess = (courseId && yearOfPassingOut) ? true : false;

        res.status(code.Success).json({contentAccess});
        return;
    }
    catch(err){
        console.log("@profileUpdateController : \n",err);
        res.status(code.ServerError).json({msg:"failed to update profile. Try again later !"})
        return;
    }
}