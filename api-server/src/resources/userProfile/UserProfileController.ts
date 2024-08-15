import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { Request, Response, Router } from "express";
import multer from "multer";
import { UserService } from "../user/UserService.js";
import { CustomRequest } from "../../common/helper/CustomRequest.js";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Set the file size limit (50MB in this case)
});

const router = Router();

router.post(
  "/update-infos",
  verifyToken,
  async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).token.userId;
    const { code, message, data } = await UserService.updateUserInfos(
      req,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

router.post(
  "/update-address",
  verifyToken,
  async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).token.userId;
    const { code, message, data } = await UserService.updateUserAddress(
      req,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

router.post(
  "/update-bank-infos",
  verifyToken,
  async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).token.userId;
    const { code, message, data } = await UserService.updateUserBankInfos(
      req,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

router.put(
  "/update-picture",
  verifyToken,
  upload.single("file"),
  async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).token.userId;
    const { code, message, data } = await UserService.updateProfilePicture(
      req,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

export default router;
