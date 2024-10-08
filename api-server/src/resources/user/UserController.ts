import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { Request, Response, Router } from "express";
import { UserService } from "./UserService.js";
import multer from "multer";
import { hasRole } from "../../common/middleware/HasRoleMiddleware.js";
import { RoleEnum } from "../../common/enum/RoleEnum.js";

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

router.get(
  "/list",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    const { code, message, data } = await UserService.getUserList(req);
    res.status(code).json({ message, data });
  },
);

router.get(
  "/:id",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    const { code, message, data } = await UserService.getUserById(
      +req.params.id,
    );
    res.status(code).json({ message, data });
  },
);

router.post(
  "/",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    const { code, message } = await UserService.createUser(req);
    res.status(code).json({ message });
  },
);

router.post(
  "/update-roles/:id",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    const { code, message, data } = await UserService.updateRoles(
      req,
      +req.params.id,
    );
    res.status(code).json({ message, data });
  },
);

router.post(
  "/update-infos/:id",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    const { code, message, data } = await UserService.updateUserInfos(
      req,
      +req.params.id,
    );
    res.status(code).json({ message, data });
  },
);

router.post(
  "/update-address/:id",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    const { code, message, data } = await UserService.updateUserAddress(
      req,
      +req.params.id,
    );
    res.status(code).json({ message, data });
  },
);

router.post(
  "/update-bank-infos/:id",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    const { code, message, data } = await UserService.updateUserBankInfos(
      req,
      +req.params.id,
    );
    res.status(code).json({ message, data });
  },
);

router.put(
  "/update-picture/:id",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { code, message, data } = await UserService.updateProfilePicture(
      req,
      +req.params.id,
    );
    res.status(code).json({ message, data });
  },
);

router.put(
  "/reset-password",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message } = await UserService.resetUserPassword(req);
    res.status(code).json({ message });
  },
);

router.put(
  "/active/:id",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    const { code, message, data } = await UserService.setUserActive(
      req,
      +req.params.id,
    );
    res.status(code).json({ message, data });
  },
);

export default router;
