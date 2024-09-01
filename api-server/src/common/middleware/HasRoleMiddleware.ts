import { NextFunction, Response, Request } from "express";
import { RoleEnum } from "../enum/RoleEnum.js";
import { CustomRequest } from "../helper/CustomRequest.js";

export const hasRole = (roles: RoleEnum[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let userRoles = (req as CustomRequest).token.userRoles;
    let hasRoles = verifyRoles(roles, userRoles);
    if (!hasRoles) {
      return res.status(401).json({ message: "Accès refusé" });
    }
    next();
  };
};

export const verifyRoles = (
  roles: RoleEnum[],
  userRoles: RoleEnum[],
): boolean => {
  return roles.some((role) => userRoles.includes(role));
};
