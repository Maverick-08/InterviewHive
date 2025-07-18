import { Prisma } from "@prisma/client";
import { services } from "./services";

export const handleError = (err: unknown, service: number) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2001":
        // The record searched for in the database was not found.
        return "Data does not exist";

      case "P2002":
        // Unique constraint failed
        if (services[service] == "User-Registration")
          return "An account with this email already exist.";

        return "Data already exists";

      case "P2003":
        // Foreign key constraint failed on the field
        if (services[service] == "User-Registration")
          return "The selected course does not exist.";
        return "The data does not exist";

      default:
        console.log(err);
        return "Prisma error";
    }
  }
  else if(err instanceof Error && ('code' in err && typeof err.code === "string")){
    console.log("Redis Error : \n",err);
    return "Authentication failed."
  }
  else {
    console.log(err);
    return "Internal Server Error";
  }
};
