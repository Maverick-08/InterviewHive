import { z } from "zod";
import { UserRegistrationDetails } from "../interface/interface.user";

// Get the current year
const currentYear = new Date().getFullYear();

export const userSchema = z.object({
  email: z.string().email("Invalid email format"),

  username: z
    .string()
    .regex(/^[A-Za-z]/, "Username must start with a letter")
    .regex(/^[A-Za-z\s]+$/, "Username must contain only letters and spaces")
    .min(2, "Username is too short."),

  yearOfPassingOut: z
    .number({
      required_error: "Year of Passing Out is required",
      invalid_type_error: "Year must be a number",
    })
    .int("Year must be an integer")
    .gte(2000, "Year must be greater than 2000")
    .lte(currentYear + 5, `Year cannot be later than ${currentYear + 5}`),

  courseId: z.string().min(1, "Course is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine((val) => !/\s/.test(val), {
      message: "Password cannot contain spaces",
    }),
});

export const validateUserRegistrationData = ({
  email,
  username,
  yearOfPassingOut,
  courseId,
  password,
}: UserRegistrationDetails) => {
  const result = userSchema.safeParse({
    email,
    username,
    yearOfPassingOut,
    courseId,
    password,
  });

  if(!result.success){
    return {status:false,msg:result.error.issues[0].message}
  }
  return {status:true,msg:""};
};
