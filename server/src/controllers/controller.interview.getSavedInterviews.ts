import { Request, Response } from "express";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { code } from "../config/status-code";
import { Interview } from "../services/Interview";

export const getSavedInterviewsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId,page, limit } = req.query as unknown as { userId: string;page:string;limit:string };

    if (!userId || !page || !limit) {
      res.status(code.BadRequest).json({ msg: "Invalid query parameters." });
      return;
    }

    if(Number.isNaN(page) || Number.isNaN(limit)){
      res.status(code.BadRequest).json({ msg: "Invalid query parameters." });
      return;
    }

    const result = await Interview.geSavedInterviewExperience(userId,parseInt(page),parseInt(limit));

    res
      .status(code.Success)
      .json({ data: result.data,totalCount:result.totalCount });
    return;
  } catch (err) {
    const errMsg = handleError(err, services.Interview);
    res.status(code.ServerError).json({ msg: errMsg });
    return;
  }
};
