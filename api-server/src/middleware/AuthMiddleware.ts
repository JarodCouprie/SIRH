import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { CustomRequest } from "../helper/CustomRequest.js";

dotenv.config();

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    (req as CustomRequest).token = <JwtPayload>(
      jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET))
    );
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
