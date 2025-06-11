import { PrismaClient } from "@prisma/client";
import {
  UserDetails,
  UserRegistrationDetails,
} from "../interface/interface.user";
import { createUser, getUserDetails } from "../utils/utils.user";
import bcrypt from "bcrypt";

export class User {
  public userId: string;
  public email: string;
  public username: string;
  public password: string;
  public yearOfPassingOut: number;
  public courseId: string;
  public avatar: string;
  public xHandle: string | null;
  public linkedIn: string | null;
  public createdAt: Date;
  private static prisma: PrismaClient;

  private constructor({
    userId,
    email,
    username,
    password,
    yearOfPassingOut,
    courseId,
    avatar,
    xHandle = null,
    linkedIn = null,
    createdAt,
  }: UserDetails) {
    this.userId = userId;
    this.email = email;
    this.username = username;
    this.password = password,
    this.yearOfPassingOut = yearOfPassingOut;
    this.courseId = courseId;
    this.avatar = avatar;
    this.xHandle = xHandle;
    this.linkedIn = linkedIn;
    this.createdAt = createdAt;
  }

  static getPrismaClient() {
    if (!this.prisma) {
      this.prisma = new PrismaClient();
    }

    return this.prisma;
  }

  static async createUser({
    email,
    password,
    username,
    courseId,
    yearOfPassingOut,
  }: UserRegistrationDetails) {
    // 1 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2 create user
    const user = await createUser({
      payload: {
        email,
        password: hashedPassword,
        username,
        courseId,
        yearOfPassingOut,
      },
      prisma: this.getPrismaClient(),
    });

    // 3. return user instance
    return new User({
      userId: user.userId,
      username: user.username,
      email: user.email,
      password: user.password,
      courseId: user.courseId,
      yearOfPassingOut: user.yearOfPassingOut,
      createdAt: user.createdAt,
      avatar: user.avatar,
      linkedIn: user.linkedIn,
      xHandle: user.xHandle,
    });
  }

  static async exists({ email }: { email: string }) {
    // 1. check if user exists
    const user: User | null = await getUserDetails({
      email,
      prisma: this.getPrismaClient(),
    });

    // 2. return
    return user;
  }

  static async isPasswordCorrect({
    password,
    hashedPassword,
  }: {
    hashedPassword: string;
    password: string;
  }) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
