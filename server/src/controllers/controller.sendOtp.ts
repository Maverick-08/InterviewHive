import { Request, Response } from "express";
import { code } from "../config/status-code";
import { PrismaClient } from "@prisma/client";
import { Redis_Service } from "../services/Redis";
import { sendEmail } from "../utils/utils.mail";

const prisma = new PrismaClient();

export const sendOtpHandler = async (req: Request, res: Response) => {
  try {
    // 1. Extract payload
    const payload = req.query as unknown as { email: string };

    // 2. If bad request
    if (!payload) {
      res.status(code.BadRequest).json({data:"Email id is missing."});
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
      res.status(code.Forbidden).json({data:"User is already registered"});
      return;
    }

    // 5. If user does not exists - create otp
    const otp = Math.floor(Math.random() * 99999 + 100000);
    await Redis_Service.createOtp(payload.email, otp);

    // 6. Send OTP
    await sendEmail(
      payload.email,
      "Registration OTP",
      "",
      `<p>Thank you for choosing <b>Interview Hive</b>!</p>
        <p>Your OTP is: <b>${otp}</b></p>
        <p><i>It is valid for 10 minutes only.</i></p>
        <p>Sent at: ${new Date().toLocaleDateString()}</p>`
    );

    // 7. Return
    res.status(code.Success).json({data:"OTP sent successfully"});
    return;
  } catch (err) {
    console.log("@sendOtpHandler : \n", err);
    res.status(code.ServerError).json({data:"Failed to send OTP. Try again later."});
    return;
  }
};
