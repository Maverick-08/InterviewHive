import { Response } from "express";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as jwt.Secret;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY as jwt.Secret;

export const getAccessToken = ({ userId }: { userId: string }) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_KEY, {
    expiresIn: "5Minutes",
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

export const getRefreshToken = ({ userId }: { userId: string }) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_KEY, {
    expiresIn: "30Days",
  });
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

export const checkToken = ({ token }: { token: string }) => {
  try {
    jwt.verify(token, REFRESH_TOKEN_KEY);
    return true;
  } catch (err) {
    return false;
  }
};
