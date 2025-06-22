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
    data: { ...payload },
  });

  return user;
};
