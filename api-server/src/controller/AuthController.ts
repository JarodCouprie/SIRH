import { Request, Response, Router } from "express";
import { AuthService } from "../service/AuthService.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import { UserService } from "../service/UserService.js";
import { CustomRequest } from "../helper/CustomRequest.js";
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
