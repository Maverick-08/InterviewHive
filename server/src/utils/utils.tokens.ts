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
    expiresIn: "2Minutes",
  });
};

export const getRefreshToken = ({
  userId,
  platform,
  tokenId
}: {
  userId: string;
  platform: "Mobile" | "Tablet" | "Laptop";
  tokenId: string
}) => {
  return jwt.sign({ userId, platform, tokenId }, REFRESH_TOKEN_KEY, {
    expiresIn: "30Days",
  });
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
