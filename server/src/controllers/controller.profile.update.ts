import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { code } from "../config/status-code";

const prisma = new PrismaClient();

export const profileUpdateController = async (req: Request, res: Response) => {
  try {
    const { courseId, yearOfPassingOut, xHandle, linkedIn } = req.body as {
      yearOfPassingOut: number;
      xHandle: string;
      linkedIn: string;
      courseId: string;
    };

    const userId = req.userId;
    // console.log({ courseId, yearOfPassingOut, xHandle, linkedIn });

    if (!yearOfPassingOut) {
      res
        .status(code.BadRequest)
        .json({
          msg: "Invalid payload",
          info: "Year of passing out is missing",
        });
      return;
    }

    if (!courseId || courseId == "") {
      res
        .status(code.BadRequest)
        .json({ msg: "Invalid payload", info: "Course Id is missing" });
      return;
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        yearOfPassingOut,
        xHandle: xHandle ?? null,
        linkedIn: linkedIn ?? null,
        course_branch: {
          connect: {
            courseInitials: courseId,
          },
        },
      },
    });

    const courseData = await prisma.course.findFirst({
      where: {
        courseInitials: courseId,
      },
    });

    const contentAccess = true;

    res
      .status(code.Success)
      .json({
        courseId,
        degree: courseData?.degree,
        branch: courseData?.branch,
        yearOfPassingOut,
        xHandle,
        linkedIn,
        contentAccess,
      });
    return;
  } catch (err) {
    console.log("@profileUpdateController : \n", err);
    res
      .status(code.ServerError)
      .json({ msg: "failed to update profile. Try again later !" });
    return;
  }
};
