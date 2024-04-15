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
      expiresIn: "15min",
    },
  );
}

export function generateRefreshToken(user: User) {
  return jwt.sign(
    { userId: user.id },
    String(process.env.REFRESH_TOKEN_SECRET),
    {
      expiresIn: "1y",
    },
  );
}

export async function generateNewAccessToken(req: Request) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return new ControllerResponse(401, "Access denied");
    const refreshToken = jwt.verify(
      token,
      String(process.env.REFRESH_TOKEN_SECRET),
    );
    // @ts-ignore
    const user: any = await UserRepository.getUserById(refreshToken.userId);
    if (!user) {
      return new ControllerResponse(401, "User doesn't exist");
    }
    if (!user.active) {
      return new ControllerResponse(401, "Inactive user");
    }
    // @ts-ignore
    delete refreshToken.iat;
    // @ts-ignore
    delete refreshToken.exp;
    return generateAccessToken(user);
  } catch (error) {
    return new ControllerResponse(401, "Invalid token");
  }
}
