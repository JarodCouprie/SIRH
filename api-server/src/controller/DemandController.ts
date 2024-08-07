import { Request, Response, Router } from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import { DemandService } from "../service/DemandService.js";

import { CustomRequest } from "../helper/CustomRequest.js";
import multer from "multer";
import { hasRole } from "../middleware/HasRoleMiddleware.js";
import { RoleEnum } from "../enum/RoleEnum.js";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Set the file size limit (50MB in this case)
});

router.get("/", verifyToken, async (req: Request, res: Response) => {
  let userId = (req as CustomRequest).token.userId;
  const { code, message, data } = await DemandService.getDemand(userId, req);
  res.status(code).json({ message, data });
});

router.get("/:id_demand", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DemandService.getDemandById(
    req.params.id_demand,
  );
  res.status(code).json({ message, data });
});

router.post(
  "/",
  verifyToken,
  upload.single("file"),
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;
    const { code, message, data } = await DemandService.createDemand(
      req,
      userId,
    );
    res.status(code).json({
      message,
      data,
    });
  },
);

router.put(
  "/:id_demand",
  verifyToken,
  upload.single("file"),
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;
    const { code, message, data } = await DemandService.editDemand(
      req.params.id_demand,
      req,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

router.put(
  "/status/:id_demand",
  verifyToken,
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;
    const { code, message, data } = await DemandService.changeStatusDemand(
      req.params.id_demand,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

router.delete(
  "/:id_demand",
  verifyToken,
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;

    const { code, message, data } = await DemandService.deleteDemand(
      req.params.id_demand,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

router.get(
  "/validation/list/:id",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { code, message, data } = await DemandService.getValidatedDemand(
      req,
      +userId,
    );
    res.status(code).json({ message, data });
  },
);

router.put(
  "/confirm-demand/:id",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;

    const { code, message, data } = await DemandService.confirmDemand(
      +req.params.id,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

router.put(
  "/confirm-demand/:id",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;

    const { code, message, data } = await DemandService.rejectDemand(
      +req.params.id,
      userId,
      req.body.justification,
    );
    res.status(code).json({ message, data });
  },
);

export default router;
