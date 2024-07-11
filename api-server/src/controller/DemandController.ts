import { Request, Response, Router } from "express";
import { verifyToken } from "../middleware/AuthMiddleware";
import { DemandService } from "../service/DemandService";

import { CustomRequest } from "../helper/CustomRequest";
import { validateData } from "../middleware/ValidationMiddleware";
import { demandCreateSchema } from "../schema/demand.schema";

const router = Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DemandService.getDemand(req);
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
  validateData(demandCreateSchema),
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;
    const { code, message, data } = await DemandService.createDemand(
      req.body,
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
  validateData(demandCreateSchema),
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;
    const { code, message, data } = await DemandService.editDemand(
      req.params.id_demand,
      req.body,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

router.put(
  "/status/:id_demand",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await DemandService.changeStatusDemand(
      req.params.id_demand,
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
export default router;
