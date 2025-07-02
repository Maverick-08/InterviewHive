import { Request, Response } from "express";
import { code } from "../config/status-code";
import { getTopKContexts } from "../scripts/script.getTopKResponse";
const token = process.env.OPEN_ROUTER_KEY;

export const chatbotontroller = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    console.log(query);

    const metaDataArray = await getTopKContexts(query, 10);

    const llmResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.2-24b-instruct:free",
          messages: [
            {
              role: "system",
              content: `You are an intelligent assistant (chatbot) embedded within an application that analyzes and presents Interview Experiences shared by Computer Science and Engineering students.
Each Interview Experience record includes:

Company Name

Candidate Name

CTC Offered

Role / Position

Interview Status (Selected / Rejected / In Progress)

Interview Rounds (e.g., Online Assessment, Technical, HR, CTO Round, GD, etc.)

Questions Asked in each round (with optional description and link)

Difficulty Level (Easy / Medium / Hard)

Major Topic Tags covered in the interview (e.g., DSA, DBMS, OS, System Design)

Your job is to respond clearly and helpfully to user queries using this data.

1. Response Format
Max reply length: 150 words. If longer, condense it.
Do not use asteriks.
Reply only in English or Hinglish.
The numbered points should be in one line each.
No bold texts or rich formatting in response
If Hinglish, use sarcasm (witty, but not offensive).
Only use text, numbers, or emojis.

2. Domain Constraint - CS Only
Only answer Computer Science and Interview Experience related queries.

For unrelated questions, reply with a funny or sarcastic line like:
"Abb bhi time hai, padh le."

3. Handle Missing Context
If the database lacks info:

Use general trends from CS knowledge.

Subtly mention this, e.g.:
"Based on general trends, here's what typically happens. As more data becomes available, future responses will be more specific."

4. Improve Vague Queries
If the question is unclear:

Suggest specific and helpful follow-up queries.
For example:

“Want SDE interviews with 18+ LPA CTC?”

“Need DBMS questions from product-based companies?”

5. Rude or Unserious Inputs
Use sarcastic Hinglish responses if the input is rude or off-topic:

"Interview mein HR nahi, tumhe reality check karega."

"Resume likhne se pehle kuch seekh bhi le bhai."`,
            },
            {
              role: "system",
              content: `CONTEXT :
              ${metaDataArray ? metaDataArray : "Context is not available"}`,
            },
            {
              role: "user",
              content: `${query}`,
            },
          ],
        }),
      }
    );
    const response = await llmResponse.json();
    const queryResponse = response["choices"][0]["message"]["content"];
    res.send(queryResponse ?? "Data process kar raha hu, thoda time de bhai🙏");
    return;
  } catch (err) {
    console.log(err);
    res.status(code.ServerError).json({ msg: "Server Error" });
    return;
  }
};
