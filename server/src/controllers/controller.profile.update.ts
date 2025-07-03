import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { code } from "../config/status-code";

const prisma = new PrismaClient();

export const profileUpdateController = async (req:Request,res:Response) => {
    try{
        const {yearOfPassingOut,xHandle,linkedIn} = req.body as {yearOfPassingOut:number,xHandle:string,linkedIn:string}

        const userId = req.userId;
        console.log({yearOfPassingOut,xHandle,linkedIn});

        if(!yearOfPassingOut){
            res.status(code.BadRequest).json({msg:"Invalid payload",info:"Year of passing out is missing"});
            return;
        }

        await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                yearOfPassingOut,
                xHandle: xHandle ?? null,
                linkedIn: linkedIn ?? null,
            }
        })

        // const contentAccess = (courseId && yearOfPassingOut) ? true : false;
        const contentAccess = true;

        res.status(code.Success).json({contentAccess});
        return;
    }
    catch(err){
        console.log("@profileUpdateController : \n",err);
        res.status(code.ServerError).json({msg:"failed to update profile. Try again later !"})
        return;
    }
}