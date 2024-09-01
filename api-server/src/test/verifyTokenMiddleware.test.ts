import { describe, expect, test, vi } from "vitest";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../common/middleware/AuthMiddleware";

describe("verifyToken middleware", () => {
  const mockRequest = (headers: object): Partial<Request> => {
    return {
      ...headers,
    };
  };

  const mockResponse = () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    return res as unknown as Response;
  };

  const mockNext: NextFunction = vi.fn();

  test("should return 401 if no token is provided", () => {
    const req = mockRequest({ headers: { authorization: "" } });
    const res = mockResponse();
    const next = mockNext;

    verifyToken(req as Request, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Accès refusé" });
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 401 if token is invalid", () => {
    const req = mockRequest({
      headers: { authorization: "Bearer invalidtoken" },
    });
    const res = mockResponse();
    const next = mockNext;

    verifyToken(req as Request, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
    expect(next).not.toHaveBeenCalled();
  });
});
