import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { code } from "../config/status-code";
import { Redis_Service } from "../services/Redis";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const changePasswordHandler = async (req:Request, res:Response) => {
    try{
        // 1. Extract payload
        const {secretToken,userId,password} = req.body as {secretToken:string,userId:string,password:string};

        // Check
        if(!secretToken || !userId || !password){
            res.status(code.BadRequest).json({msg:"Invalid payload"});
            return;
        }

        // 2. Validate the secret token
        const isTokenValid = await Redis_Service.verifyPasswordToken(userId,secretToken);

        // 3. If token validation fails - link expired or invalid token sent
        if(!isTokenValid.success){
            res.status(code.Unauthorized).json({msg:isTokenValid.msg});
            return;
        }

        if(password == "@"){
            res.status(code.Success).send();
            return;
        }

        if(password.length < 8){
            res.status(code.BadRequest).json({data:"The password should be minimum 8 characters long"});
            return;
        }

        // 4. If token matches - update password
        const hashedPassword = await bcrypt.hash(password,10);
        await prisma.user.update({
            where:{
                id:userId as string
            },
            data:{
                password:hashedPassword
            }
        })

        // 5. Invalidate cache
        Redis_Service.invalidateSecretToken(userId);

        // 6. Return
        res.status(code.Success).json({data:"Password has been updated"})
        return;
    }
    catch(err){
        console.log("@changePasswordHandler : \n",err);
        res.status(code.ServerError).json({msg:"Failed to update password. Try again later !"});
        return;
    }
}