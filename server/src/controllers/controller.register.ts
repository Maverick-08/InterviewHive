import { Request, Response } from "express";
import { code } from "../config/status-code";
import { UserRegistrationDetails } from "../interface/interface.user";
import { validateUserRegistrationData } from "../validations/validate.userDetails";
import { User } from "../services/User";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { Redis_Service } from "../services/Redis";

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

        // 3. if otp is missing
        if(!payload.otp){
            res.status(code.BadRequest).send("OTP is missing");
            return;
        }

        // 4. Verify OTP
        const doesOTPMatch = await Redis_Service.verifyOtp(payload.email,parseInt(payload.otp))

        // 5. If OTP does not match
        if(!doesOTPMatch){
            res.status(code.BadRequest).send("Incorrect OTP");
            return;
        }

        // 6. if payload is valid then create user
        await User.createUser(payload);
        
        // 7. return
        res.status(code.Success).json({msg:"User created successfully."});

        return;
    }
    catch (err) {
        
        const errorMessage = handleError(err,services["User-Registration"]);
        res.status(code.ServerError).json({ msg: errorMessage });
        return;
    }
}