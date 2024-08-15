import { Request, Response, Router } from "express";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { TeamService } from "./TeamService.js";

const router = Router();

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await TeamService.getTeamByAgency(
    +req.params.id,
  );
  res.status(code).json({
    message,
    data,
  });
});

export default router;
