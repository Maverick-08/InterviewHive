import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PrismaClient } from "@prisma/client";
import { pipeline } from "@xenova/transformers";
const prisma = new PrismaClient();

export const createTextDataFromInterviews = async (interviewId: string) => {
  try {
    console.log("1. Fetching Interview Details");
    const interview = await prisma.interview.findFirst({
      where: {
        id: interviewId,
      },
      include: {
        interviewRounds: {
          include: {
            questions: true,
          },
        },
        user: {
          select: {
            username: true,
          },
        },
        tags: true,
      },
    });

    if (!interview) {
      console.log("-> Error");
      console.log("---X---X---X---X---X---X---X---X---X---");
      console.log("No interview record exists.");
      console.log("---X---X---X---X---X---X---X---X---X---");
      return;
    }

    console.log("2. Record Fetched Successfully");

    console.log("3. Creating Text Input");
    //Add interview info
    const lines: string[] = [
      `Candidate: ${interview.user.username}`,
      `Company Name: ${interview.companyName}`,
      `Role: ${interview.role}`,
      `CTC Offered: ${interview.CTCOffered}`,
    ];

    // Add interview info
    for (const round of interview.interviewRounds) {
      if (round.questions.length > 0) {
        lines.push(`\nRound Type: ${round.roundType}`);
        for (const question of round.questions) {
          lines.push(`- Question: ${question.title}`);
        }
      }
    }

    // Add interview topic tags
    if (interview.tags.length > 0) {
      lines.push(`\nMajor topics around which interview was centered:`);
      for (const tag of interview.tags) {
        lines.push(`- ${tag.tagName}`);
      }
    }

    const text = lines.join("\n");

    console.log("4. Text Generated Successfully");
    const tags = interview.tags.map((tag) => tag.tagName);
    return {
      text,
      metadata: {
        companyName: interview.companyName,
        candidate: interview.user.username,
        year: interview.yearOfInterview,
        totalInterviewRounds: interview.interviewRounds.length,
        tags,
      },
    };
  } catch (err) {
    console.log("-> Error");
    console.log("---X---X---X---X---X---X---X---X---X---");
    console.log(err);
    console.log("---X---X---X---X---X---X---X---X---X---");
  }
};

export const createChunks = async (text: string) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
    chunkOverlap: 60,
  });

  const output = await splitter.splitText(text);
  console.log(output);
  return output;
};

export const createEmbddings = async (chunks: string[]) => {
  // pipeline() abstracts model loading and task execution
  // It gives a simple interface to load pre-trained models for tasks like text generation, classification, and feature extraction (embeddings).
  const extractor = await pipeline(
    "feature-extraction", // Loads a feature extraction pipeline
    "Xenova/bge-small-en",
    { quantized: true } // The { quantized: true } option loads a smaller, more memory-efficient version
  );

  const embeddings: { chunk: string; embedding: number[] }[] =
    await Promise.all(
      chunks.map(async (chunk) => {
        const result = await extractor(chunk, {
          pooling: "mean", // Averages the token-level embeddings → results in one sentence-level vector. Without pooling, you’d get embeddings for every word/token
          normalize: true, // Normalizes the vector for cosine similarity
        });
        return {
          chunk,
          embedding: Array.from(result.data as Float32Array) as number[], // Ensure type is number[]
        };
      })
    );

  console.log(embeddings);
  return embeddings;
};

export const storeEmbedding = async (
  embeddedData: { chunk: string; embedding: number[] }[],
  metadata: {
    companyName: string;
    candidate: string;
    year: number;
    totalInterviewRounds: number;
    tags: string[];
  }
) => {
  const metadataString = JSON.stringify(metadata);

  for (let data of embeddedData) {
    const { chunk, embedding } = data;

    await prisma.$executeRawUnsafe(
      `
      INSERT INTO "vectorStore" (chunk, metadata, embedding)
      VALUES ($1, $2, $3, $4::vector)
    `,
      chunk,
      metadataString,
      `[${embedding.join(",")}]`
    );
  }
};
