import { Request, Response } from "express";
import { code } from "../config/status-code";
import { UserRegistrationDetails } from "../interface/interface.user";
import { validateUserRegistrationData } from "../validations/validate.userDetails";
import { User } from "../services/User";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const userRegistrationController = async (req:Request,res:Response) => {
    try{
        const payload:UserRegistrationDetails = req.body;

        // 1. check if payload is valid
        const validatePayloadResult = validateUserRegistrationData(payload);

        // 2. if payload is invalid
        if(!validatePayloadResult.status){
            res.status(code.BadRequest).json({msg:validatePayloadResult.msg});
            return;
        }

        // 3. if payload is valid then create user
        await User.createUser(payload);
        
        // 4. return
        res.status(code.Success).json({msg:"User created successfully."});

        return;
    }
    catch (err) {
        
        const errorMessage = handleError(err,services["User-Registration"]);
        res.status(code.ServerError).json({ msg: errorMessage });
        return;
    }
}