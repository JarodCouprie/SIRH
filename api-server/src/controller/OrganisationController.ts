import { Request, Response, Router } from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import { OrganisationService } from "../service/OrganisationService.js";

const router = Router();

router.post(
  "/agency/create",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await OrganisationService.createAgency(req);
    res.status(code).json({
      message,
      data,
    });
  },
);

export default router;
