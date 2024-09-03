import { Request, Response, Router } from "express";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { AgencyService } from "./AgencyService.js";
import { CustomRequest } from "../../common/helper/CustomRequest.js";
import { DemandService } from "../demand/DemandService.js";

const router = Router();

/**
 * @swagger
 * /api/agency/:
 *   get:
 *     summary: Récupère les agences.
 *     description: Récupère les agences .
 *     responses:
 *       200:
 *         description: Retourne les agences souhaitées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalData:
 *                     type: integer
 *                     description: Nombre d'agence trouvées
 *                 list:
 *                   type: array
 *                   description: Liste des agences retrouvées
 *                   items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: identifiant de l'agence
 *                      label:
 *                        type: string
 *                        description:  nom de l'agence
 *                      street:
 *                        type: string
 *                        description: rue de l'agence
 *                      streetNumber:
 *                        type: integer
 *                        description: numéro de rue de l'agence
 *                      locality:
 *                        type: string
 *                        description: nom de la ville de l'agence
 *                      zipcode:
 *                        type: integer
 *                        description: code postale de l'agence
 *                      lat:
 *                        type: integer
 *                        description: lattitude de l'agence
 *                      lng:
 *                        type: integer
 *                        description: longitude de l'agence
 *       500:
 *         description: Échec de la récupération de l'agence
 */
router.get("/", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await AgencyService.getAgency(req);
  res.status(code).json({ message, data });
});

/**
 * @swagger
 * /api/agency/coordinates:
 *   get:
 *     summary: Récupère les coordonnées de l'agence.
 *     description: Récupère les coordonnées de l'agence .
 *     responses:
 *       200:
 *         description: Retourne les coordonnées de l'agence souhaitée
 *         content:
 *           application/json:
 *             schema:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: identifiant de l'agence
 *                      label:
 *                        type: string
 *                        description: nom de l'agence
 *                      lat:
 *                        type: integer
 *                        description: lattitude de l'agence
 *                      lng:
 *                        type: integer
 *                        description: longitude de l'agence
 *       500:
 *         description: Échec de la récupération des coordonnées l'agence
 */
router.get("/coordinates", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await AgencyService.getAgencyCoord(req);
  res.status(code).json({ message, data });
});

router.get("/data", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } =
    await AgencyService.getDemandGroupedByMonthData(req);
  res.status(code).json({ message, data });
});

/**
 * @swagger
 * /api/agency/{id_agency}:
 *   get:
 *     summary: Récupère une agence.
 *     description: Récupère une agence en fonction de l'id en paramètre .
 *     parameters:
 *       - in: path
 *         name: id_agency
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id de l'agence
 *     responses:
 *       200:
 *         description: Retourne l'agence souhaitée
 *         content:
 *           application/json:
 *             schema:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: identifiant de l'agence
 *                      label:
 *                        type: string
 *                        description: nom de l'agence
 *                      address:
 *                        type: string
 *                        description: adresse de l'agence
 *       500:
 *         description: Échec de la récupération des coordonnées l'agence
 */
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
