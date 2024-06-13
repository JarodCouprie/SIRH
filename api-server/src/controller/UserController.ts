import dotenv from "dotenv";
import { verifyToken } from "../middleware/AuthMiddleware";
import { Request, Response, Router } from "express";
import { UserService } from "../service/UserService";

dotenv.config();
const router = Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await UserService.getUsers();
  res.status(code).json({ message, data });
});

router.get("/list", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await UserService.getUserList(req);
  res.status(code).json({ message, data });
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await UserService.getUserById(+req.params.id);
  res.status(code).json({ message, data });
});

router.post("/", verifyToken, async (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json("ça marche");
});

export default router;
