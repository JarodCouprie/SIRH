import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  token: JwtPayload;
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    userId: number;
  }
}
