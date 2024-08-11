import { Request, Response, Router } from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import { AgencyService } from "../service/AgencyService.js";

const router = Router();

router.post("/create", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await AgencyService.createAgency(req);
  res.status(code).json({
    message,
    data,
  });
});

export default router;
