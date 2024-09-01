import { describe, expect, test, vi } from "vitest";
import { hasRole, verifyRoles } from "../common/middleware/HasRoleMiddleware";
import { RoleEnum } from "../common/enum/RoleEnum";
import { NextFunction } from "express";
import { CustomRequest } from "../common/helper/CustomRequest";
import { Response } from "express";

const mockRequest = (userRoles: RoleEnum[]) => {
  return {
    token: {
      userRoles,
    },
  } as CustomRequest;
};

const mockResponse = () => {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  return res as unknown as Response;
};

describe("HasRoleMiddleware should verify roles", () => {
  test("Test hasRoleMiddleware to deny access", () => {
    const req = mockRequest([RoleEnum.USER]);
    const res = mockResponse();
    let next: NextFunction = vi.fn();

    const roles = [RoleEnum.ADMIN, RoleEnum.HR];
    const middleware = hasRole(roles);
    middleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Accès refusé" });
    expect(next).not.toHaveBeenCalled();
  });
  test("Test hasRoleMiddleware to grant access", () => {
    const req = mockRequest([RoleEnum.ADMIN]);
    const res = mockResponse();
    let next: NextFunction = vi.fn();

    const roles = [RoleEnum.ADMIN, RoleEnum.HR];
    const middleware = hasRole(roles);
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
  test("Test hasRoleMiddleware verifyRoles to be false", () => {
    const roles = [RoleEnum.USER];
    const userRoles = [RoleEnum.ADMIN];
    const hasRole = verifyRoles(roles, userRoles);
    expect(hasRole).toBe(false);
  });
  test("Test hasRoleMiddleware verifyRoles to be true", () => {
    const roles = [RoleEnum.USER];
    const userRoles = [RoleEnum.ADMIN, RoleEnum.USER];
    const hasRole = verifyRoles(roles, userRoles);
    expect(hasRole).toBe(true);
  });
});
