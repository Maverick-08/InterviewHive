import { Request, Response } from "express";
import { code } from "../config/status-code";
const token = process.env.OPEN_ROUTER_KEY;

export const chatbotontroller = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    const llmResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        messages: [
          {
            role: "user",
            content: `${query}`,
          },
        ],
      }),
    });
    const response = await llmResponse.json();
    res.json({response});
    return;
  } catch (err) {
    console.log(err);
    res.status(code.ServerError).json({ msg: "Server Error" });
    return;
  }
};
