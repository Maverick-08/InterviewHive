import {
  createChunks,
  createEmbddings,
  createTextDataFromInterview,
  storeEmbedding,
} from "../utils/utils.loadData";

export const createKnowledgeBase = async (interviewId: string) => {
  try {
    // Task 1 : Create Textual Summary and Metadata
    console.log("\nA. Create Textual Summary");
    const preProcessedData: {
      textualData: string;
      metadata: {
        companyName: string;
        candidate: string;
        year: number;
        totalInterviewRounds: number;
        difficultyLevel: string,
        tags: string[];
      };
    } | null = await createTextDataFromInterview(interviewId);

    // Task 2 : Create Chunks of textual summary
    console.log("\nB. Create Text Chunks");
    let chunks: string[] | null;
    if (preProcessedData && preProcessedData.textualData) {
      chunks = await createChunks(preProcessedData.textualData);
    } else {
      throw new Error(
        "Failed to create chunks as pre-processed Data does not exists."
      );
    }

    // Task 3 : Create Vector Embeddings
    console.log("\nC. Create Vector Embeddings");
    let embeddings:
      | {
          chunk: string;
          embedding: number[];
        }[]
      | undefined;
    if (chunks) {
      embeddings = await createEmbddings(chunks);
    } else {
      throw new Error("Failed to create vector embeddings");
    }

    // Task 4 : Store this vector embedding alongwith the metadata in the vector store
    console.log("\nD. Store Embeddings");
    if(embeddings){
        await storeEmbedding(embeddings,preProcessedData.metadata);
    }

  } catch (err) {
    console.log("@createKnowledgeBase \n", err);
  }
  return;
};
