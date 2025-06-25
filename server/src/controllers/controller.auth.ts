import { Request, Response } from "express";
import { code } from "../config/status-code";
import { validateUserAuthData } from "../validations/validate.userDetails";
import { User } from "../services/User";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../utils/utils.tokens";
import { Redis_Service } from "../services/Redis";

export const userAuthController = async (req: Request, res: Response) => {
  try {
    const payload: {
      email: string;
      password: string;
      platform: "Mobile" | "Tablet" | "Laptop";
    } = req.body;

    // 1. check if payload is valid
    const validatePayloadResult = validateUserAuthData(payload);

    // 2. if payload is invalid
    if (!validatePayloadResult.status) {
      res.status(code.BadRequest).json({ msg: validatePayloadResult.msg });
      return;
    }

    // 3. if payload is valid then check if user is registered
    const user = await User.exists({ email: payload.email });

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

    // if password matches

    // 6. create tokens
    // Access token
    const accessToken = getAccessToken({ userId: user.id });

    // Refresh Token
    const refreshToken = getRefreshToken({
      userId: user.id,
      platform: payload.platform,
    });

    // 7. Hydrate redis store
    await Redis_Service.createSession({
      userId: user.id,
      platform: payload.platform,
      token: refreshToken,
    });

    // 8. set access token cookie
    setAccessToken(res, accessToken);

    // 9. set refresh token cookie
    setRefreshToken(res, refreshToken);

    // 10. return data
    res.status(code.Success).json({
      id: user.id,
      username: user.username,
      degree: user.course_branch.degree,
      branch: user.course_branch.branch,
      yearOfPassingOut: user.yearOfPassingOut,
      avatar: user.avatar,
      xHandle: user.xHandle,
      linkedIn: user.linkedIn,
    });

    return;
  } catch (err) {
    const errorMessage = handleError(err, services["User-Authentication"]);
    res.status(code.ServerError).json({ msg: errorMessage });
    return;
  }
};
