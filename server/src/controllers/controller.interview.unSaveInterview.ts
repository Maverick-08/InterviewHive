import { Request, Response } from "express";
import { code } from "../config/status-code";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const unSaveInterviewController = async (
  req: Request,
  res: Response
) => {
  try {
    const payload = req.query as unknown as { interviewId: string };

    if (!payload.interviewId) {
      res.status(code.BadRequest).json({ msg: "Interview id is missing." });
      return;
    }
    // 1. get user id
    const userId = req.userId as string;

    // 2. get interview id
    const interviewId = payload.interviewId as string;

    // 3. check if interview id exists or not
    const doesInterviewExists = await prisma.interview.findFirst({
      where: {
        id: interviewId,
      },
    });

    // 4. if the record does not exists
    if (!doesInterviewExists) {
      res
        .status(code.BadRequest)
        .json({ msg: "The Interview has been deleted" });
      return;
    }

    // 4. Check if interview is saved or unsaved
    const isInterviewRemoved = await prisma.savedInterview.findFirst({
      where: {
        userId,
        interviewId,
      },
    });

    // 5. If user tries to unsave interview which is already unsaved
    if (!isInterviewRemoved) {
      res
        .status(code.Success)
        .json({ data:"Already Unsaved" });
      return;
    } else {
      await prisma.savedInterview.delete({
        where: {
          userId_interviewId: {
            userId,
            interviewId,
          },
        },
      });

      res.status(code.Success).json({ data: "Unsaved" });
      return;
    }
  } catch (err) {
    console.log("@saveInterview : \n", err);
    res.status(code.ServerError).json({ msg: "Internal Server Error" });
    return;
  }
};
