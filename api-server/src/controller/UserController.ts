import { verifyToken } from "../middleware/AuthMiddleware";
import { Request, Response, Router } from "express";
import { UserService } from "../service/UserService";

const router = Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await UserService.getUsers();
  res.status(code).json({ message, data });
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await UserService.getUserById(req.params.id);
  res.status(code).json({ message, data });
});

export default router;
