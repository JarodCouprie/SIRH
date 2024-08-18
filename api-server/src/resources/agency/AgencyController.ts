import { Request, Response, Router } from "express";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { AgencyService } from "./AgencyService.js";
import { CustomRequest } from "../../common/helper/CustomRequest.js";
import { DemandService } from "../demand/DemandService.js";

const router = Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await AgencyService.getAgency(req);
  res.status(code).json({ message, data });
});

router.get("/coordinates", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await AgencyService.getAgencyCoord(req);
  res.status(code).json({ message, data });
});

router.get("/data", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } =
    await AgencyService.getDemandGroupedByMonthData(req);
  res.status(code).json({ message, data });
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await AgencyService.getAgencyById(
    +req.params.id,
  );
  res.status(code).json({ message, data });
});

router.post("/create", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await AgencyService.createAgency(req);
  res.status(code).json({
    message,
    data,
  });
});

router.post(
  "/update-address/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await AgencyService.updateAgenceInfos(
      req,
      +req.params.id,
    );
    res.status(code).json({ message, data });
  },
);

router.delete(
  "/:id_agency",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await AgencyService.deleteAgency(
      +req.params.id_agency,
    );
    res.status(code).json({ message, data });
  },
);

export default router;
