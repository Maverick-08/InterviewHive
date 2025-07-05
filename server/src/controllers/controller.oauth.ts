import { Request, Response } from "express";
import { code } from "../config/status-code";
import { User } from "../services/User";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../utils/utils.tokens";
import { Redis_Service } from "../services/Redis";

export const oAuthHandler = async (req: Request, res: Response) => {
  try {
    // 1. Extract payload
    const payload = req.body as {
      username: string;
      email: string;
      platform: "Mobile" | "Tablet" | "Laptop";
    };

    // 2. Checks
    if (!payload.email || !payload.username || !payload.platform) {
      res.status(code.BadRequest).json({ msg: "Invalid Payload" });
      return;
    }

    // 3. Check if account exists
    const userExists = await User.exists({ email: payload.email });
    let userId = userExists ? userExists.id : null;
    // If user's details are complete - allow him to access content
    const contentAccess =
      userExists && userExists.courseId && userExists.yearOfPassingOut
        ? true
        : false;

    // 4. If user id does not exits - new user - create account
    if (!userId) {
      const user = await User.createUser({
        email: payload.email,
        username: payload.username,
        courseId:"NA"
      });
      userId = user.id;
    }

    // 5. Create tokens
    const accessToken = getAccessToken({ userId: userId as string });
    const refreshToken = getRefreshToken({
      userId: userId as string,
      platform: payload.platform,
    });

    // 6. Hydrate cache
    await Redis_Service.createSession({
      token: refreshToken,
      userId: userId as string,
      platform: payload.platform,
    });

    // 7. Set on response object
    setAccessToken(res, accessToken);
    setRefreshToken(res, refreshToken);

    // 8. Return
    res
      .status(code.Success)
      .json({
        userId,
        username: payload.username,
        contentAccess,
      });
    return;
  } catch (err) {
    console.log("@oAuthHandler : \n", err);
    res.status(code.ServerError).json({ msg: "Google Authentication Failed" });
    return;
  }
};
