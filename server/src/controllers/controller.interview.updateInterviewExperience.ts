import { Request, Response } from "express";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { code } from "../config/status-code";
import { Interview, InterviewDetails } from "../services/Interview";

export const updateInterviewExperienceController = async (
  req: Request,
  res: Response
) => {
  try {
    const { interviewData, interviewId } = req.body as {
      interviewId: string;
      interviewData: InterviewDetails;
    };

    if (!interviewId || !interviewData) {
      res
        .status(code.BadRequest)
        .json({ msg: "Interview data or Interview id is missing." });
      return;
    }

    await Interview.deleteInterviewExperience(interviewId);
    await Interview.addInterviewExperience(interviewData);

    res
      .status(code.Success)
      .json({ msg: "Interview experience updated successfully." });
    return;
  } catch (err) {
    const errMsg = handleError(err, services.Interview);
    res.status(code.ServerError).json({ msg: errMsg });
    return;
  }
};
