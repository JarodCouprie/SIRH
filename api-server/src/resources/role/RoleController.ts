import { Request, Response, Router } from "express";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { RoleService } from "./RoleService.js";

const router = Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await RoleService.getRoles();
  res.status(code).json({ message, data });
});

export default router;
