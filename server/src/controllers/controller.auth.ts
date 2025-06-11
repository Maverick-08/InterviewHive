import { Request, Response } from "express";
import { code } from "../config/status-code";
import { validateUserAuthData } from "../validations/validate.userDetails";
import { User } from "../services/User";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import jwt from "jsonwebtoken";
import { Course } from "../services/Course";

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as jwt.Secret;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY as jwt.Secret;

export const userAuthController = async (req: Request, res: Response) => {
  try {
    const payload: { email: string; password: string } = req.body;

    // 1. check if payload is valid
    const validatePayloadResult = validateUserAuthData(payload);

    // 2. if payload is invalid
    if (!validatePayloadResult.status) {
      res.status(code.BadRequest).json({ msg: validatePayloadResult.msg });
      return;
    }

    // 3. if payload is valid then check if user is registered
    const user: User | null = await User.exists({ email: payload.email });

    // 4. if user is not registered
    if (!user) {
      res.status(code.BadRequest).json({ msg: "Account is not registered." });
      return;
    }

    // 4. if user is registered - match password
    const isPasswordCorrect = await User.isPasswordCorrect({
      password: payload.password,
      hashedPassword: user?.password as string,
    });

    // 5. if password does not match
    if (!isPasswordCorrect) {
      res.status(code.BadRequest).json({ msg: "Invalid credentials." });
      return;
    }

    // 6. if password matches

    // a. get course details
    const courseDetails = await Course.getCourseDetails({
      courseId: user.courseId,
    });

    // b. create tokens
    // Access token
    const accessToken = jwt.sign({ userId: user.userId }, ACCESS_TOKEN_KEY, {
      expiresIn: "30s",
    });

    // Refresh Token
    const refreshToken = jwt.sign({ userId: user.userId }, REFRESH_TOKEN_KEY, {
      expiresIn: "30d",
    });

    // 7. set access token cookie
    res.cookie("__accessToken__", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 1000,
      path: "/",
    });

    // 8. set refresh token cookie
    res.cookie("__refreshToken__", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/refresh",
    });

    // 9. return data
    res
      .status(code.Success)
      .json({
        userId: user.userId,
        username: user.username,
        email:user.email,
        courseId: user.courseId,
        courseName: courseDetails?.courseName,
        branchName: courseDetails?.branchName,
        yearOfPassingOut: user.yearOfPassingOut,
        avatar: user.avatar,
        xHandle: user.xHandle,
        linkedIn: user.linkedIn,
      });

    return;
  } catch (err) {
    const errorMessage = handleError(err, services["User-Registration"]);
    res.status(code.ServerError).json({ msg: errorMessage });
    return;
  }
};
