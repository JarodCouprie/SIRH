import { User } from "../model/User";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { ControllerResponse } from "./ControllerResponse";
import { UserRepository } from "../repository/UserRepository";

export function generateAccessToken(user: User) {
  return jwt.sign(
    { userId: user.id },
    String(process.env.ACCESS_TOKEN_SECRET),
    {
      expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
    },
  );
}

export function generateRefreshToken(user: User) {
  return jwt.sign(
    { userId: user.id },
    String(process.env.REFRESH_TOKEN_SECRET),
    {
      expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
    },
  );
}

export async function generateNewAccessToken(req: Request) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return new ControllerResponse(401, "Access denied");
    const refreshToken = <jwt.JwtPayload>(
      jwt.verify(token, String(process.env.REFRESH_TOKEN_SECRET))
    );
    const user = await UserRepository.getUserById(refreshToken.userId);
    if (!user) {
      return new ControllerResponse(401, "L'utilisateur n'existe pas");
    }
    // if (!user.active) {
    //   return new ControllerResponse(401, "Utilisateur inactif");
    // }
    return {
      accessToken: generateAccessToken(user),
      refreshToken: generateRefreshToken(user),
    };
  } catch (error) {
    return new ControllerResponse(401, "Token invalide");
  }
}
