import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RoleEnum } from "../enum/RoleEnum.js";

export interface CustomRequest extends Request {
  token: JwtPayload;
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    userId: number;
    userRoles: RoleEnum[];
  }
}
