import { Request, Response, Router } from "express";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { TeamService } from "./TeamService.js";

const router = Router();

/**
 * @swagger
 * /api/team/{id_team}:
 *   get:
 *     summary: Récupère les équipes.
 *     description: Récupère les équipes .
 *     responses:
 *       200:
 *         description: Retourne les équipes souhaitées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalData:
 *                     type: integer
 *                     description: Nombre de membre dans l'équipe
 *                 list:
 *                   type: array
 *                   description: Liste des équipes retrouvées
 *                   items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: identifiant de l'agence
 *                      label:
 *                        type: string
 *                        description:  nom de l'agence
 *
 *       500:
 *         description: Échec de la récupération de l'agence
 */
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
