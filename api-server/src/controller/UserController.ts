import { verifyToken } from "../middleware/AuthMiddleware.js";
import { Request, Response, Router } from "express";
import { UserService } from "../service/UserService.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Set the file size limit (50MB in this case)
});

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
  const { code, message } = await UserService.createUser(req);
  res.status(code).json({ message });
});

router.post(
  "/set-roles/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await UserService.setNewRole(
      req,
      +req.params.id,
    );
    res.status(code).json({ message, data });
  },
);

router.put(
  "/set-picture/:id",
  verifyToken,
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { code, message, data } = await UserService.setNewProfilePicture(
      req,
      +req.params.id,
    );
    res.status(code).json({ message, data });
  },
);

router.put("/active/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await UserService.setUserActive(
    req,
    +req.params.id,
  );
  res.status(code).json({ message, data });
});

export default router;
