import { Request, Response, Router } from "express";
import { AuthService } from "./AuthService.js";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { UserService } from "../user/UserService.js";
import { CustomRequest } from "../../common/helper/CustomRequest.js";
import dotenv from "dotenv";

const router = Router();
dotenv.config();

router.post("/login", async (req: Request, res: Response) => {
  const { code, message, data } = await AuthService.loginUser(req);
  res.status(code).json({ message, data });
});

router.get("/refresh-token", async (req: Request, res: Response) => {
  const { code, message, data } = await AuthService.refreshToken(req);
  res.status(code).json({ message, data });
});

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await UserService.getUserById(
    (req as CustomRequest).token.userId,
  );
  res.status(code).json({ message, data });
});

export default router;
