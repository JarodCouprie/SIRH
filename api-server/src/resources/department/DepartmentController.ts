import { Request, Response, Router } from "express";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { AgencyService } from "../agency/AgencyService.js";
import { DepartmentService } from "./DepartmentService.js";

const router = Router();

/**
 * @swagger
 * /api/service/{id_agency}:
 *   get:
 *     summary: Récupère les services de l'agence.
 *     description: Récupère les services de l'agence selon l'id passé en paramètre.
 *     parameters:
 *       - in: path
 *         name: id_agency
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id de l'agence
 *     responses:
 *       200:
 *         description: Retourne les services souhaités
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalData:
 *                     type: integer
 *                     description: Nombre de serices trouvées
 *                 list:
 *                   type: array
 *                   description: Liste des services retrouvées
 *                   items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: identifiant du service
 *                      label:
 *                        type: string
 *                        description:  nom du service
 *                      minimum_users:
 *                        type: integer
 *                        description: nombre de membre minimum
 *                      id_user_lead_service:
 *                        type: integer
 *                        description: id du chef de service
 *                      lead_service_lastname:
 *                        type: string
 *                        description: nom du chef de service
 *                      lead_service_firstname:
 *                        type: string
 *                        description: prénom du chef de service
 *                      team_count:
 *                        type: integer
 *                        description: nombre d'équipe dans le service
 *                      count_team:
 *                        type: integer
 *                        description: nombre de membre dans l'équipe
 *       500:
 *         description: Échec de la récupération du service
 */
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DepartmentService.getDepartmentByAgency(
    +req.params.id,
  );
  res.status(code).json({
    message,
    data,
  });
});

/**
 * @swagger
 * /api/service/department/{id_department}:
 *   get:
 *     summary: Récupère un service .
 *     description: Récupère un service selon l'id passé en paramètre.
 *     parameters:
 *       - in: path
 *         name: id_department
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id du service
 *     responses:
 *       200:
 *         description: Retourne le service souhaité
 *         content:
 *           application/json:
 *             schema:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: identifiant du service
 *                      label:
 *                        type: string
 *                        description:  nom du service
 *                      minimum_users:
 *                        type: integer
 *                        description: nombre de membre minimum
 *                      id_user_lead_service:
 *                        type: integer
 *                        description: id du chef de service
 *                      lead_service_lastname:
 *                        type: string
 *                        description: nom du chef de service
 *                      lead_service_firstname:
 *                        type: string
 *                        description: prénom du chef de service
 *                      team_count:
 *                        type: integer
 *                        description: nombre d'équipe dans le service
 *                      count_team:
 *                        type: integer
 *                        description: nombre de membre dans l'équipe
 *       500:
 *         description: Échec de la récupération du service
 */
router.get(
  "/department/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await DepartmentService.getDepartmentById(
      +req.params.id,
    );
    res.status(code).json({
      message,
      data,
    });
  },
);

/**
 * @swagger
 * /api/service/create/{id_agency}:
 *   post:
 *     summary: Créer un nouveau service
 *     description: Créer un nouveau service
 *     parameters:
 *       - in: path
 *         name: id_agency
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id de l'agence
 *     requestBody:
 *       required: true
 *       content:
 *         demand:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                  type: string
 *                  description: nom du service
 *               minimum_user:
 *                  type: integer
 *                  description: nombre de membre minimum
 *               id_user_lead_service:
 *                  type: integer
 *                  description: id du chef de service
 *               id_agency:
 *                  type: integer
 *                  description: id de l'agence où le service est créé
 *     responses:
 *       200:
 *         description: Création effectuée avec succès
 *       500:
 *         description: Échec de la création du service
 */
router.post("/create/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DepartmentService.createDepartment(
    +req.params.id,
    req,
  );
  res.status(code).json({
    message,
    data,
  });
});

/**
 * @swagger
 * /api/service/update-info/{id_department}:
 *   post:
 *     summary: Modification du service
 *     description: Modification du service
 *     parameters:
 *       - in: path
 *         name: id_department
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id du service
 *     requestBody:
 *       required: true
 *       content:
 *         demand:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                  type: string
 *                  description: nom du service
 *               minimum_user:
 *                  type: integer
 *                  description: nombre de membre minimum
 *               id_user_lead_service:
 *                  type: integer
 *                  description: id du chef de service
 *               id_agency:
 *                  type: integer
 *                  description: id de l'agence où le service est créé
 *     responses:
 *       200:
 *         description: Modification effectuée avec succès
 *       500:
 *         description: Échec de la création du service
 */
router.post(
  "/update-info/:id_department",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await DepartmentService.updateDepartment(
      +req.params.id_department,
      req,
    );
    res.status(code).json({
      message,
      data,
    });
  },
);

/**
 * @swagger
 * /api/service/{id_department}:
 *   delete:
 *     summary: Suppression d'un service
 *     description: Suppression d'un service
 *     parameters:
 *       - in: path
 *         name: id_department
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id du service pour suppression
 *     responses:
 *       200:
 *         description: Suppression effectuée avec succès
 *       500:
 *         description: Échec de la suppression du service
 */

router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DepartmentService.deleteDepartment(
    +req.params.id,
  );
  res.status(code).json({
    message,
    data,
  });
});

export default router;
