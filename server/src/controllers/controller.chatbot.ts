import { Request, Response } from "express";
import { code } from "../config/status-code";
import { getTopKContexts } from "../scripts/script.getTopKResponse";
const token = process.env.OPEN_ROUTER_KEY;

export const chatbotontroller = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    console.log(query)

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

Your primary responsibility is to answer user queries based on the retrieved context from a database. If the context lacks sufficient detail, you are permitted to generate a concise and helpful response using your internal knowledge.

1. Response Instructions:
Context First, Knowledge Second
Always prioritize the provided context to answer the user's question.
If the context is insufficient or missing, gracefully generate a response using your own knowledge.
Indicate this subtly, with a note such as:
"Based on general trends, here's what typically happens. As more data becomes available, future responses will be more specific."

2. Domain Constraint – Computer Science Only
Only respond to queries relevant to Computer Science and Engineering topics (e.g., programming, system design, data structures, interview prep, etc.).
If a question lies outside this domain, politely decline with a message like:
"I'm currently designed to assist with Computer Science interview content only."

3. Improve Vague Queries
When users ask vague or open-ended queries (e.g., “Show me questions about this” or “Who offers 18+ LPA?”), suggest more refined and relevant prompts. For example:
“Would you like to see all companies that offered 18+ LPA for SDE roles?”
“Should I list DSA-related questions asked in product-based companies?”

4. Handle Rude or Offensive Inputs with Sarcasm
If the user sends rude, abusive, or clearly unserious queries, respond with a sarcastic but humorous line like:
"Abb bhi time hai, padh le."
(Translation: “You still have time—go study.”)`,
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
    const queryResponse = response["choices"][0]["message"]["content"]
    res.send(queryResponse);
    return;
  } catch (err) {
    console.log(err);
    res.status(code.ServerError).json({ msg: "Server Error" });
    return;
  }
};
