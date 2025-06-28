import {
  UserDetails,
  UserRegistrationDetails,
} from "../interface/interface.user";
import { createUser, getUser, getUserDetails } from "../utils/utils.user";
import bcrypt from "bcrypt";


export class User {
  public id: string;
  public email: string;
  public username: string;
  public password: string;
  public yearOfPassingOut: number;
  public courseId: string;
  public avatar: string;
  public xHandle: string | null;
  public linkedIn: string | null;
  public createdAt: Date;

  private constructor({
    id,
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
    this.id = id;
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
    });

    // 3. return user instance
    return new User({
      id: user.id,
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
    const user = await getUserDetails({
      email,
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

  static async getUserDetails({userId}:{userId:string}) {
    return await getUser(userId);
  }
}
