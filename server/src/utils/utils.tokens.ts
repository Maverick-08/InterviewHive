import { Response } from "express";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as jwt.Secret;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY as jwt.Secret;

export const getAccessToken = ({
  userId,
}: {
  userId: string;
}) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_KEY, {
    expiresIn: "30Minutes",
  });
};

export const getRefreshToken = ({
  userId,
  platform
}: {
  userId: string;
  platform: "Mobile" | "Tablet" | "Laptop";
}) => {
  const token =  jwt.sign({ userId, platform }, REFRESH_TOKEN_KEY, {
    expiresIn: "30Days",
  });

  return token;
};

export const setAccessToken = (res: Response, token: string) => {
  res.cookie("__accessToken__", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });
  return;
};

export const setRefreshToken = (res: Response, token: string) => {
  res.cookie("__refreshToken__", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });
  return;
};

export const isRefreshTokenValid = ({ token }: { token: string }) => {
  try {
    jwt.verify(token, REFRESH_TOKEN_KEY);
    return {valid:true,expired:false};
  } catch (err) {
    if(err instanceof jwt.TokenExpiredError){
      return {valid:true,expired:true};
    }
    return {valid:false,expired:false};
  }
};

export const isAccessTokenValid = ({ token }: { token: string }) => {
  try {
    jwt.verify(token, ACCESS_TOKEN_KEY);
    return {valid:true,expired:false};
  } catch (err) {
    if(err instanceof jwt.TokenExpiredError){
      return {valid:true,expired:true};
    }
    return {valid:false,expired:false};
  }
};
