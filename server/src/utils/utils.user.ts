import { PrismaClient } from "@prisma/client";
import { UserRegistrationDetails } from "../interface/interface.user";

const prisma = new PrismaClient();

export const getUserDetails = async ({
  email,
}: {
  email: string;
}) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    include:{
      course_branch:true
    }
  });
  return user;
};

export const createUser = async ({
  payload,
}: {
  payload: UserRegistrationDetails;
}) => {
  // Remove courseId from payload before passing to Prisma
  const { courseId, ...userPayload } = payload;
  const user = await prisma.user.create({
    data: { 
      ...userPayload,
      course_branch: {
        connect: {
          courseInitials: courseId
        }
      }
    },
  });

  return user;
};

export const getUser = async (userId:string) => {
  try{
      const response = await prisma.user.findFirst({
        where:{
          id:userId
        },
        select:{
          course_branch:{
            select:{
              degree:true,
              branch:true
            }
          },
          username:true,
          yearOfPassingOut:true,
          avatar:true,
          linkedIn:true,
          xHandle:true,
          email:true
        }
      });

      return response;
  }
  catch(err){
    console.log("@getUser : \n",err);
    return null;
  }
}
