import { Request, Response } from "express";
import { code } from "../config/status-code";
import { PrismaClient } from "@prisma/client";
import { Redis_Service } from "../services/Redis";
// import { sendEmail } from "../utils/utils.mail";
import { sendEmailResend } from "../utils/utils.resend-email";

const prisma = new PrismaClient();

export const sendOtpHandler = async (req: Request, res: Response) => {
  try {
    // 1. Extract payload
    const payload = req.query as unknown as { email: string };

    // 2. If bad request
    if (!payload) {
      res.status(code.BadRequest).json({ msg: "Email id is missing." });
      return;
    }

    // 3. Check if user is already registered
    const userExists = await prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    // 4. If user already exists
    if (userExists) {
      res.status(code.Forbidden).json({ msg: "User is already registered" });
      return;
    }

    // 5. Check otp count - rate limiting
    const otpCount = await Redis_Service.getMailCount(payload.email);

    // 6. If otp count is null - new user
    if (!otpCount) {
      await Redis_Service.setMailCount(payload.email, 1);
    }
    // 7. Check if otp count has exceeded it's limit
    else {
      const parsedOtpCount = parseInt(otpCount);

      // If limit is exceeded - return
      if (parsedOtpCount > 3) {
        res
          .status(code.Forbidden)
          .json({ msg: "Account's OTP limit has exceeded" });
        return;
      }
      // If limit has not exceeded - increase count
      else {
        await Redis_Service.setMailCount(payload.email, parsedOtpCount + 1);
      }
    }

    // 8. If OTP limit has not exceeded - create otp
    const otp = Math.floor(Math.random() * 99999 + 100000);
    await Redis_Service.createOtp(payload.email, otp);

    // 9. Send Mail
    const response = await sendEmailResend({
      to: payload.email,
      subject: "Registration OTP",
      html: `<p>Thank you for choosing <b>Interview Hive</b>!</p>
        <p>Your OTP is: <b>${otp}</b></p>
        <p><i>It is valid for 10 minutes only.</i></p>
        `,
    });

    // 10. If failed to send mail
    if (!response.success) {
      // Failed to send mail - due to rate limit
      if (response.rateLimitExceeded) {
        res
          .status(code.ServiceUnavailable)
          .json({
            msg: "our mail server limit has expired. Try again tomorrow",
          });
        return;
      } else {
        res.status(code.ServerError).json({ msg: "Mail server error" });
        return;
      }
    }
    // 11. Mail sent successfully
    else {
      res.status(code.Success).json({ data: "OTP sent successfully" });
      return;
    }
  } catch (err) {
    console.log("@sendOtpHandler : \n", err);
    res
      .status(code.ServerError)
      .json({ msg: "Failed to send OTP. Try again later." });
    return;
  }
};
