import { PrismaClient } from "@prisma/client";
import { UserRegistrationDetails } from "../interface/interface.user";

export const getUserDetails = async ({
  email,
  prisma,
}: {
  email: string;
  prisma: PrismaClient;
}) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user;
};

export const createUser = async ({
  payload,
  prisma,
}: {
  payload: UserRegistrationDetails;
  prisma: PrismaClient;
}) => {
  const user = await prisma.user.create({
    data: { ...payload },
  });

  return user;
};
