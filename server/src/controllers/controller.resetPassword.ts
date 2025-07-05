import { Request, Response } from "express";
import { code } from "../config/status-code";
import crypto from "crypto";
import { Redis_Service } from "../services/Redis";
import { User } from "../services/User";
import { sendEmailResend } from "../utils/utils.resend-email";

export const resetPasswordHandler = async (req: Request, res: Response) => {
  try {
    // 1. Extract user id
    const { email } = req.query as unknown as { email: string };

    // 2. If there's no email
    if (!email) {
      res.status(code.BadRequest).json({ msg: "Invalid payload" });
      return;
    }

    // 3. Get user details
    const user = await User.exists({ email });

    // 4. If user does not exists
    if (!user) {
      res.status(code.BadRequest).json({ msg: "The user is not registered" });
      return;
    }

    // 5. If request to reset password comes again - < 5 mins
    const cachedSecret = await Redis_Service.getResetPasswordToken(user.id);
    if(cachedSecret){
      const parsedSecret = JSON.parse(cachedSecret);
      const createdAt = parsedSecret.createdAt;
      const currentTime = new Date().getTime()
      const secretCreationTime = new Date(createdAt).getTime();
      const timeDiff = Math.floor((currentTime-secretCreationTime)/1000);

      if(timeDiff <= 300){ // 5 mins have not elapsed
        res.status(code.Forbidden).json({msg:"New link will be sent after 5 mins"});
        return;
      }
    }

    // 6. Check mail count
    const mailCount = await Redis_Service.getMailCount(email);

    // 7. If mail count is null
    if (!mailCount) {
      await Redis_Service.setMailCount(email, 1);
    }
    // 8. Check if mail count has exceeded it's limit
    else {
      const parsedMailCount = parseInt(mailCount);

      // If limit is exceeded - return
      if (parsedMailCount > 3) {
        res
          .status(code.Forbidden)
          .json({ msg: "Account's Mail limit has exceeded" });
        return;
      }
      // If limit has not exceeded - increase count
      else {
        await Redis_Service.setMailCount(email, parsedMailCount + 1);
      }
    }

    // 9. Get user details
    const userId = user.id as string;
    const mailAddress = user.email as string;

    // 10. Generate secret token
    const secretToken = crypto.randomBytes(32).toString("hex");

    // 11. Save this secret token in cache
    await Redis_Service.setResetPasswordToken(userId, secretToken);

    // 12. Mail draft
    const resetLink = `https://interview-hive.dev-projects.site/reset-password/${secretToken}/${userId}`;
    const html = `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Reset Your Password</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Reset Password</a>
            <p><strong>Note:</strong> This link is valid for only 15 minutes.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thanks,<br/>The InterviewHive Team</p>
          </div>
        `;
    // 13. Send mail
    const response = await sendEmailResend({
      to: mailAddress,
      subject: "Password Reset",
      html,
    });

    // 14. If failed to send mail
    if (!response.success) {
      // Failed to send mail - due to rate limit
      if (response.rateLimitExceeded) {
        res.status(code.ServiceUnavailable).json({
          msg: "our mail server limit has expired. Try again tomorrow",
        });
        return;
      } else {
        res.status(code.ServerError).json({ msg: "Mail server error" });
        return;
      }
    } 
    // 15. If mail sent successfully
    else {
      res
        .status(code.Success)
        .json({ data: "Reset password link has been sent to your mail." });
      return;
    }
  } catch (err) {
    console.log("@resendOtpHandler : \n", err);
    res
      .status(code.ServerError)
      .json({ msg: "Failed to send reset password mail. Try again later." });
    return;
  }
};
