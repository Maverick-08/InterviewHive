import { Request, Response } from "express";
import { handleError } from "../config/errorMessages";
import { services } from "../config/services";
import { code } from "../config/status-code";
import { Interview } from "../services/Interview";
import z from "zod";

const QuerySchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform((val) => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1) throw new Error("Invalid page number.");
      return num;
    }),
  limit: z
    .string()
    .optional()
    .default("10")
    .transform((val) => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1) throw new Error("Invalid limit number.");
      return num;
    }),
  // Tags can be a single string (e.g., ?tags=DSA) or an array of strings (e.g., ?tags=DSA&tags=OS)
  tags: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (val === undefined) return [];
      if (Array.isArray(val)) return val.map((tag) => tag.trim());
      return [val.trim()]; // If it's a single string, put it in an array
    }),
  companyName: z.string().optional(),
});

export const getAllInterviewsController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedSchema = QuerySchema.safeParse(req.query);

    if (!parsedSchema.success) {
      res
        .status(code.BadRequest)
        .json({ msg: "Invalid query parameters provided." });
      return;
    }

    const { tags: interviewTags, page, limit, companyName } = parsedSchema.data;

    const result = await Interview.getAllInterviews(
      page,
      limit,
      interviewTags,
      companyName
    );

    res
      .status(code.Success)
      .json({...result});
    return;
  } catch (err) {
    const errMsg = handleError(err, services.Interview);
    res.status(code.ServerError).json({ msg: errMsg });
    return;
  }
};
