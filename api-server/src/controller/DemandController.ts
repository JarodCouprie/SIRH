import { Request, Response, Router } from "express";
import { verifyToken } from "../middleware/AuthMiddleware";
import { DemandService } from "../service/DemandService";

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

router.put("/:id_demand", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DemandService.editDemand(
    req.params.id_demand,
    req.body,
  );
  res.status(code).json({ message, data });
});

router.delete(
  "/:id_demand",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await DemandService.deleteDemand(
      req.params.id_demand,
    );
    res.status(code).json({ message, data });
  },
);

router.post("/", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DemandService.createDemand(req.body);
  res.status(code).json({ message, data });
  // console.log(req.body);
  // res.status(200).json("gg");
});

export default router;
