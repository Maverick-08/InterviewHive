import { Request, Response } from "express";
import { code } from "../config/status-code";
import crypto from "crypto";
import { Redis_Service } from "../services/Redis";
import { User } from "../services/User";
import { sendEmail } from "../utils/utils.mail";

export const resetPasswordHandler = async (req: Request, res: Response) => {
  try {
        // 1. Extract user id
        const {email} = req.query as unknown as {email:string};

        // 2. If there's no email
        if(!email){
            res.status(code.BadRequest).json({msg:"Invalid payload"});
            return;
        }

        // 3. Get user details
        const user = await User.exists({email});
        const userId = user?.id as string;
        const mailAddress = user?.email as string;

        // 4. Generate secret token
        const secretToken = crypto.randomBytes(32).toString("hex");

        // 5. Save this secret token in cache
        await Redis_Service.setResetPasswordToken(userId,secretToken);

        // 6. Send mail to the user
        const resetLink = `http://localhost:5173/reset-password/${secretToken}/${userId}`;
        const html = `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Reset Your Password</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Reset Password</a>
            <p><strong>Note:</strong> This link is valid for only 10 minutes.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thanks,<br/>The InterviewHive Team</p>
          </div>
        `;
        await sendEmail(mailAddress, "Reset Password","", html);

        res.status(code.Success).json({data:"Reset password link has been sent to your mail."});
        return;

  } catch (err) {
    console.log("@resendOtpHandler : \n", err);
    res
      .status(code.ServerError)
      .json({ msg: "Failed to send reset password mail. Try again later." });
    return;
  }
};
