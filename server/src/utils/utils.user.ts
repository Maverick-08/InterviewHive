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
  const user = await prisma.user.create({
    data: { ...payload,courseId: payload.courseId ?? "NA"},
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
          xHandle:true
        }
      });

      return response;
  }
  catch(err){
    console.log("@getUser : \n",err);
    return null;
  }
}
