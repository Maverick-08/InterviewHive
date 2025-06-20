import { Request, Response } from "express";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { code } from "../config/status-code";
import { Interview } from "../services/Interview";

export const getUserInterviewsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.query as unknown as { userId: string };
    const currentUsersId = req.userId;

    if (!userId) {
      res.status(code.BadRequest).json({ msg: "Invalid query parameters." });
      return;
    }

    const result = await Interview.getUserInterviews(userId);

    res
      .status(code.Success)
      .json({ data: result, showEditOption: userId == currentUsersId });
    return;
  } catch (err) {
    const errMsg = handleError(err, services.Interview);
    res.status(code.ServerError).json({ msg: errMsg });
    return;
  }
};
