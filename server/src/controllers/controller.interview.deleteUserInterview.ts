import { Request, Response } from "express";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { code } from "../config/status-code";
import { Interview } from "../services/Interview";

export const deleteInterviewByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { interviewId } = req.query as unknown as { interviewId: string };

    if (!interviewId) {
      res.status(code.BadRequest).json({ msg: "Invalid query parameters." });
      return;
    }

    // const currentUsersId = req.userId;

    // if(currentUsersId !== userId){
    //   res.status(code.Forbidden).json({msg:"You do not have access to perform this operation."});
    //   return;
    // }

    await Interview.deleteInterviewExperience(interviewId);

    res.status(code.Success).json({msg:"Interview experience deleted succesfully."});
    return;
  } catch (err) {
    const errMsg = handleError(err, services.Interview);
    res.status(code.ServerError).json({ msg: errMsg });
    return;
  }
};
