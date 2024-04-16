import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { verifyToken } from "../middleware/AuthMiddleware";
import { AuthService } from "../service/AuthService";
import { UserService } from "../service/UserService";
import { CustomRequest } from "../helper/CustomRequest";

const router = Router();
dotenv.config();

router.post("/register", async (req: Request, res: Response) => {
  const { code, message } = await AuthService.createUser(req);
  res.status(code).json({ message });
});

router.post("/login", async (req: Request, res: Response) => {
  const { code, message, data } = await AuthService.loginUser(req);
  res.status(code).json({ message, data });
});

router.get("/refresh-token", async (req: Request, res: Response) => {
  const { code, message, data } = await AuthService.refreshToken(req);
  res.status(code).json({ message, data });
});

router.put(
  "/reset-password",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message } = await AuthService.resetUserPassword(req);
    res.status(code).json({ message });
  },
);

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await UserService.getUserById(
    (req as CustomRequest).token.userId,
  );
  res.status(code).json({ message, data });
});

export default router;
