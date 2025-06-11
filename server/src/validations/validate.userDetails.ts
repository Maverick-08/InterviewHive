import { z } from "zod";
import { UserRegistrationDetails } from "../interface/interface.user";

// Get the current year
const currentYear = new Date().getFullYear();

const emailSchema = z.string().email("Invalid email format");

const usernameSchema = z
  .string()
  .regex(/^[A-Za-z]/, "Username must start with a letter")
  .regex(/^[A-Za-z\s]+$/, "Username must contain only letters and spaces")
  .min(2, "Username is too short.");

const yearOfPassingOutSchema = z
  .number({
    required_error: "Year of Passing Out is required",
    invalid_type_error: "Year must be a number",
  })
  .int("Year must be an integer")
  .gte(2000, "Year must be greater than 2000")
  .lte(currentYear + 5, `Year cannot be later than ${currentYear + 5}`);

const courseIdSchema = z.string().min(1, "Course is required");

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .refine((val) => !/\s/.test(val), {
    message: "Password cannot contain spaces",
  });

export const validateUserRegistrationData = ({
  email,
  username,
  yearOfPassingOut,
  courseId,
  password,
}: UserRegistrationDetails) => {
  let result = {
    status:
      usernameSchema.safeParse(username).success &&
      courseIdSchema.safeParse(courseId).success &&
      yearOfPassingOutSchema.safeParse(yearOfPassingOut).success &&
      emailSchema.safeParse(email).success &&
      passwordSchema.safeParse(password).success,

    message:
      usernameSchema.safeParse(username).error?.issues[0].message ||
      courseIdSchema.safeParse(courseId).error?.issues[0].message ||
      yearOfPassingOutSchema.safeParse(yearOfPassingOut).error?.issues[0]
        .message ||
      emailSchema.safeParse(email).error?.issues[0].message ||
      passwordSchema.safeParse(password).error?.issues[0].message,
  };

  if (!result.status) {
    return { status: false, msg: result.message };
  }
  return { status: true, msg: "" };
};

export const validateUserAuthData = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  let result = {
    status:
      emailSchema.safeParse(email).success &&
      passwordSchema.safeParse(password).success,

    message:
      emailSchema.safeParse(email).error?.issues[0].message ||
      passwordSchema.safeParse(password).error?.issues[0].message,
  };

  if (!result.status) {
    return { status: false, msg: result.message };
  }
  return { status: true, msg: "" };
};
