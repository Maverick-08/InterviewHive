import { Request, Response } from "express";
import { code } from "../config/status-code";
import { UserRegistrationDetails } from "../interface/interface.user";
import { validateUserRegistrationData } from "../validations/validate.userDetails";
import { User } from "../services/User";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { Redis_Service } from "../services/Redis";
import { sendEmailResend } from "../utils/utils.resend-email";

export const userRegistrationController = async (
  req: Request,
  res: Response
) => {
  try {
    const payload: UserRegistrationDetails = req.body;

    // 1. check if payload is valid
    const validatePayloadResult = validateUserRegistrationData(payload);

    // 2. if payload is invalid
    if (!validatePayloadResult.status) {
      res.status(code.BadRequest).json({ msg: validatePayloadResult.msg });
      return;
    }

    const userExists = await User.exists({ email: payload.email });

    if (userExists) {
      res
        .status(code.BadRequest)
        .json({ msg: "Account is already registered." });
      return;
    }

    // 3. if otp is missing
    if (!payload.otp) {
      res.status(code.BadRequest).json({ msg: "OTP is missing" });
      return;
    }

    // 4. Verify OTP
    const doesOTPMatch = await Redis_Service.verifyOtp(
      payload.email,
      parseInt(payload.otp)
    );

    // 5. If OTP does not match
    if (!doesOTPMatch) {
      res.status(code.BadRequest).json({ msg: "Incorrect OTP" });
      return;
    }

    // 6. if payload is valid then create user
    await User.createUser(payload);

    // 7. return
    res.status(code.Success).json({ data: "Account created successfully." });

    // 8. Send a mail
    const html = `
            <h2>Ole Mate !</h2>
            <p>Thank you for registering with us.</p>
            <p>With Interview Hive, you can:</p>
            <ul>
                <li>Read a wide range of interview questions and answers</li>
                <li>Bookmark your favorite interviews for quick access</li>
                <li>Prepare effectively for your upcoming interviews</li>
            </ul>
            <p>We're excited to help you on your interview journey!</p>
            <p>Best regards,<br/>The Interview Hive Team</p>
            `;
    sendEmailResend({
      to: payload.email,
      subject: "Welcome to Interview Hive!",
      html,
    });

    return;
  } catch (err) {
    const errorMessage = handleError(err, services["User-Registration"]);
    res.status(code.ServerError).json({ msg: errorMessage });
    return;
  }
};
