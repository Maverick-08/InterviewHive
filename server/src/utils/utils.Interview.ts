import { PrismaClient } from "@prisma/client";
import { Interview, InterviewDetails } from "../services/Interview";
const prisma = new PrismaClient();

export const fetchAllInterviews = async (page: number, limit: number) => {
  const response = await prisma.interview.findMany({
    include: {
      interviewRounds: {
        include: {
          questions: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return response;
};

export const fetchFilteredInterviews = async (
  tags: string[],
  companyName:string,
  page: number,
  limit: number
) => {
  const interviews = await prisma.interview.findMany({
    where: {
      tags: {
        some: {
          tagName: {
            in: tags,
          },
        },
      },
      companyName:{
        startsWith: companyName ? companyName : undefined
      }
    },
    include: {
      interviewRounds: {
        include: {
          questions: true,
        },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return interviews;
};

export const fetchInterviewsByCompanyName = async (
  companyName: string,
  page: number,
  limit: number
) => {
  const response = await prisma.interview.findMany({
    where: {
      companyName: {
        startsWith: companyName,
      },
    },
    include: {
      interviewRounds: {
        include: {
          questions: true,
        },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return response;
};

export const fetchInterviewsSharedByUser = async (userId:string) => {
    const response = await prisma.interview.findMany({
        where:{
            authorId:userId
        }
    })

    return response;
}

export const fetchInterviewById = async (interviewId:string) => {
    const response = await prisma.interview.findFirst({
        where:{
            id:interviewId
        }
    });

    return response;
}

export const createInterviewExperience = async (interviewData:InterviewDetails) => {
    const result = await prisma.$transaction(async (tx) => {
        // 1. create interview
        const {id:interviewId} = await tx.interview.create({
            data:{
                authorId:interviewData.authorId,
                companyName:interviewData.companyName,
                yearOfInterview:interviewData.yearOfInterview,
                role:interviewData.role,
                CTCOffered:interviewData.CTCOffered,
                interviewStatus:interviewData.interviewStatus
            },
            select:{
                id:true
            }
        });

        // 2. create tags
        for(let tag of interviewData.tags){
            const response = await tx.interviewTag.findUnique({
                where:{
                    tagName:tag.tagName
                }
            })

            if(!response){
                await tx.interviewTag.create({
                    data:{
                        tagName:tag.tagName
                    }
                })
            }
        }

        // 3. create interview rounds and questions
        for(let round of interviewData.interviewRounds){
            const {id:roundId} = await tx.interviewRound.create({
                data:{
                    roundType:round.roundType,
                    note:round.note,
                    interviewId
                }
            })

            // 4. for each round create round questions
            for(let question of round.questions){
                await tx.question.create({
                    data:{
                        title:question.title,
                        description:question.description,
                        link:question.link,
                        roundId
                    }
                })
            }
        }

        return true;
    });
    return result;
}

export const deleteUserInterviewExperience = async (interviewId:string) => {
    const result = await prisma.interview.delete({
        where:{
            id:interviewId
        },
        include:{
            interviewRounds:{
                include:{
                    questions:true
                }
            }
        }
    }) ;
    return result;
}

export const updateUserInterviewExperience = async (interviewId:string,interviewData:InterviewDetails) => {
    await prisma.interview.delete({
        where:{
            id:interviewId
        },
        include:{
            interviewRounds:{
                include:{
                    questions:true
                }
            }
        }
    })
    await createInterviewExperience(interviewData);
    return true;
}