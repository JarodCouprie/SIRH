import { Request, Response, Router } from "express";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { TeamService } from "./TeamService.js";

const router = Router();

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await TeamService.getTeamByService(
    +req.params.id,
  );
  res.status(code).json({
    message,
    data,
  });
});

router.get(
  "/details/:id_team",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await TeamService.getTeamById(
      +req.params.id_team,
    );
    res.status(code).json({
      message,
      data,
    });
  },
);

router.post("/create", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await TeamService.createTeam(req);
  res.status(code).json({
    message,
    data,
  });
});

router.put(
  "/edit/:id_team",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await TeamService.editTeam(
      +req.params.id_team,
      req,
    );
    res.status(code).json({
      message,
      data,
    });
  },
);

router.delete("/:id_team", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await TeamService.deleteTeam(
    +req.params.id_team,
  );
  res.status(code).json({
    message,
    data,
  });
});

export default router;
