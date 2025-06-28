import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { code } from "../config/status-code";
import { Redis_Service } from "../services/Redis";

const prisma = new PrismaClient();

export const viewCountHandler = async (req: Request, res: Response) => {
  try {
    // 1. Extract payload
    const payload = req.query as unknown as { interviewId: string };

    // 2. If payload is invalid
    if (!payload.interviewId) {
      res.status(code.BadRequest).send("Missing Interview Id");
      return;
    }

    // 3. Extract count data
    const interviewCountData = await Redis_Service.getInterviewViewCount(
      payload.interviewId
    );

    // 4. If count data exists
    if (interviewCountData) {
      // 5. Get parsed value
      const parsedValue = JSON.parse(interviewCountData) as {
        viewCount: number;
      };

      // 6. Update cache
      await Redis_Service.setInterviewViewCount(payload.interviewId,(parsedValue.viewCount+1));

      // 7. Update DB
      await prisma.interview.update({
        where: {
          id: payload.interviewId,
        },
        data: {
          viewCount: parsedValue.viewCount + 1,
        },
      });
    }
    // 8. If count data does not exists 
    else {
      // 9. Hydrate cache
      Redis_Service.setInterviewViewCount(payload.interviewId, 1);

      // 10. Update DB
      await prisma.interview.update({
        where: {
          id: payload.interviewId,
        },
        data: {
          viewCount: 1,
        },
      });
    };

    res.status(code.SuccessNoContent).send();
    return;
  } catch (err) {
    console.log("@viewCount Hnadler : \n" + err);
    res.status(code.ServerError).send();
    return;
  }
};
