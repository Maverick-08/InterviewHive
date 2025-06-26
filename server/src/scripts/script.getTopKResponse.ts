import {
  createEmbddings,
  getTopKSimilarVectors,
} from "../utils/utils.loadData";

export const getTopKContexts = async (userQuery: string, K: number = 5) => {
  try {
    // 1. Create Embedding
    const embeddedData:
      | {
          chunk: string;
          embedding: number[];
        }[]
      | undefined = await createEmbddings([userQuery]);

    // 2. Query Vector in database
    let response:
      | {
          id: string;
          chunk: string;
          metadata: any;
          similarity: number;
        }[]
      | undefined;
    if (embeddedData && embeddedData[0].embedding) {
      response = await getTopKSimilarVectors(embeddedData[0].embedding, K);
    }

    // 3. Return Metadata array
    if (response) {
      const hashedInterviewIds = new Set();
      const metadataArray = [];

      for(let data of response){
        if(!hashedInterviewIds.has(data.metadata.id)){
          hashedInterviewIds.add(data.metadata.id);
          metadataArray.push(data.metadata);
        }
      }
      return metadataArray;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/* 
{
id: '36a48d71-3ec5-412a-b1f6-df49bbbb0610',                                                                                      
chunk: 'Major topics around which interview was centered:\n' +                                                                   
  '- Object Oriented Programming\n' +
  '- DBMS\n' +                                                                                                                   
  '- DSA',
metadata: {                                                                                                                      
  tags: [ 'Object Oriented Programming', 'DBMS', 'DSA' ],
  year: 2025,                                                                                                                    
  candidate: 'Dev Paglu',                                                                                                        
  companyName: 'SAMSUNG',                                                                                                        
  difficultyLevel: 'EASY',                                                                                                       
  totalInterviewRounds: 3
},                                                                                                                               
similarity: 1.7069313526153564                                                                                                   
server-1  | }      
*/