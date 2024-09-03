import { Request, Response, Router } from "express";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { DemandService } from "./DemandService.js";

import { CustomRequest } from "../../common/helper/CustomRequest.js";
import multer from "multer";
import { hasRole } from "../../common/middleware/HasRoleMiddleware.js";
import { RoleEnum } from "../../common/enum/RoleEnum.js";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Set the file size limit (50MB in this case)
});

/**
 * @swagger
 * /api/demand/list/{type}:
 *   get:
 *     summary: Récupère les demandes de l'utilisateur.
 *     description: Récupère les demandes de l'utilisateur selon le type passé en paramètre.
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type de demande
 *     responses:
 *       200:
 *         description: Retourne les demandes souhaitées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalData:
 *                     type: integer
 *                     description: Nombre de demandes trouvées
 *                 list:
 *                   type: array
 *                   description: Liste des demandes retrouvées
 *                   items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: identifiant de la demande
 *                      start_date:
 *                        type: string
 *                        format: date
 *                        description : date de début de la demande
 *                      end_date:
 *                        type: string
 *                        format: date
 *                        description : date de fin de la demande
 *                      created_at:
 *                        type: string
 *                        format: date
 *                        description: date de création de la demande
 *                      motivation:
 *                        type: string
 *                        description: motivation de la demande
 *                        required: false
 *                      justification:
 *                       type: string
 *                       description: justification de la demande
 *                       required: false
 *                      status:
 *                        type: string
 *                        description: Status actuel de la demande (DRAFT, WAITING, ACCPETED, DENIED)
 *                      number_day:
 *                        type: integer
 *                        description: nombre de jour de la demande
 *                      id_owner:
 *                        type: integer
 *                        description: id du créateur de la demande
 *                      type:
 *                        type: string
 *                        description: Type de la demande (CA, TT, RTT, ABSENCE, SICKNESS)
 *                      file_url:
 *                        type: string
 *                        description: url du fichier donnée avec la demande
 *                      id_validator:
 *                        type: integer
 *                        description: id du validateur de la demande
 *                        required: false
 *                      validated_at:
 *                        type: string
 *                        format: date
 *                        description: date de validation
 *                        required: false
 *
 *
 *       500:
 *         description: Échec de la récupération de la demande
 */
router.get("/list/:type", verifyToken, async (req: Request, res: Response) => {
  let userId = (req as CustomRequest).token.userId;
  const { code, message, data } = await DemandService.getDemand(
    userId,
    req,
    req.params.type,
  );
  res.status(code).json({ message, data });
});

/**
 * @swagger
 * /api/demand/{id_demand}:
 *   get:
 *     summary: Récupère une demande de l'utilisateur.
 *     description: Récupère une demande de l'utilisateur selon l'id passé en paramètre.'
 *     parameters:
 *       - in: path
 *         name: id_demand
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id de la demande
 *     responses:
 *       200:
 *         description: Retourne la demande souhaitée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                      id:
 *                        type: string
 *                        description: identifiant de la demande
 *                      start_date:
 *                        type: string
 *                        format: date
 *                        description : date de début de la demande
 *                      end_date:
 *                        type: string
 *                        format: date
 *                        description : date de fin de la demande
 *                      created_at:
 *                        type: string
 *                        format: date
 *                        description: date de création de la demande
 *                      motivation:
 *                        type: string
 *                        description: motivation de la demande
 *                        required: false
 *                      justification:
 *                       type: string
 *                       description: justification de la demande
 *                       required: false
 *                      status:
 *                        type: string
 *                        description: Status actuel de la demande (DRAFT, WAITING, ACCPETED, DENIED)
 *                      number_day:
 *                        type: integer
 *                        description: nombre de jour de la demande
 *                      id_owner:
 *                        type: integer
 *                        description: id du créateur de la demande
 *                      type:
 *                        type: string
 *                        description: Type de la demande (CA, TT, RTT, ABSENCE, SICKNESS)
 *                      file_url:
 *                        type: string
 *                        description: url du fichier donnée avec la demande
 *                      id_validator:
 *                        type: integer
 *                        description: id du validateur de la demande
 *                        required: false
 *                      validated_at:
 *                        type: string
 *                        format: date
 *                        description: date de validation
 *                        required: false
 *
 *
 *       500:
 *         description: Échec de la récupération de la demande
 */
router.get("/:id_demand", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await DemandService.getDemandById(
    req.params.id_demand,
  );
  res.status(code).json({ message, data });
});

/**
 * @swagger
 * /api/demand/:
 *   post:
 *     summary: Créer une nouvelle demande
 *     description: Créer une nouvelle demande au nom de l'utilisateur connecté
 *     requestBody:
 *       required: true
 *       content:
 *         demand:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                   type: string
 *                   format: date
 *                   description : date de début de la demande
 *               end_date:
 *                   type: string
 *                   format: date
 *                   description : date de fin de la demande
 *               motivation:
 *                  type: string
 *                  description: Justification et explication du contexte de la demande
 *               status:
 *                  type: string
 *                  description: Status actuel de la demande (DRAFT, WAITING, ACCPETED, DENIED)
 *               type:
 *                  type: string
 *                  description: Type de la demande (CA, TT, RTT, ABSENCE, SICKNESS)
 *               number_day:
 *                  type: integer
 *                  description: nombre de jour de la demande
 *               file_url:
 *                  type: string
 *                  description: url du fichier donnée avec la demande
 *               id_owner:
 *                  type: integer
 *                  description: id du créateur de la demande
 *     responses:
 *       200:
 *         description: Création effectuée avec succès
 *       500:
 *         description: Échec de la création de la demande
 */
router.post(
  "/",
  verifyToken,
  upload.single("file"),
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;
    const { code, message, data } = await DemandService.createDemand(
      req,
      userId,
    );
    res.status(code).json({
      message,
      data,
    });
  },
);

/**
 * @swagger
 * /api/demand/{id_demand}:
 *   put:
 *     summary: Modifier une demande
 *     description: Modifier une demande au nom de l'utilisateur connecté
 *     requestBody:
 *       required: true
 *       content:
 *         demand:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                   type: string
 *                   format: date
 *                   description : date de début de la demande
 *               end_date:
 *                   type: string
 *                   format: date
 *                   description : date de fin de la demande
 *               motivation:
 *                  type: string
 *                  description: Justification et explication du contexte de la demande
 *               status:
 *                  type: string
 *                  description: Status actuel de la demande (DRAFT, WAITING, ACCPETED, DENIED)
 *               type:
 *                  type: string
 *                  description: Type de la demande (CA, TT, RTT, ABSENCE, SICKNESS)
 *               number_day:
 *                  type: integer
 *                  description: nombre de jour de la demande
 *               file_url:
 *                  type: string
 *                  description: url du fichier donnée avec la demande
 *     responses:
 *       200:
 *         description: Modification effectuée avec succès
 *       500:
 *         description: Échec de la modification de la demande
 */
router.put(
  "/:id_demand",
  verifyToken,
  upload.single("file"),
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;
    const { code, message, data } = await DemandService.editDemand(
      req.params.id_demand,
      req,
      userId,
    );
    res.status(code).json({ message, data });
  },
);
/**
 * @swagger
 * /api/demand/status/{id_demand}:
 *   put:
 *     summary: Modifier le status d'une demande
 *     description: Modifier le status d'une demande au nom de l'utilisateur connecté
 *     requestBody:
 *       required: true
 *       content:
 *         demand:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                   type: integer
 *                   description : Id de la demande
 *               status:
 *                  type: string
 *                  description: Status actuel de la demande (DRAFT, WAITING, ACCPETED, DENIED)
 *     responses:
 *       200:
 *         description: Modification du status effectuée avec succès
 *       500:
 *         description: Échec de la modification du status de la demande
 */
router.put(
  "/status/:id_demand",
  verifyToken,
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;
    const { code, message, data } = await DemandService.changeStatusDemand(
      req.params.id_demand,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

/**
 * @swagger
 * /api/demand/{id_demand}:
 *   delete:
 *     summary: Suppression d'une demande
 *     description: Suppression d'une demande au nom de l'utilisateur connecté
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id de la demande pour suppression
 *     responses:
 *       200:
 *         description: Suppression effectuée avec succès
 *       500:
 *         description: Échec de la suppression de la demande
 */

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
  /**
   * @swagger
   * /api/demand/validation/list/{userId}:
   *   get:
   *     summary: Récupère la liste des demandes de l'utilisateur.
   *     description: Récupère la liste des demandes de l'utilisateur selon l'id passé en paramètre.'
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: integer
   *         required: true
   *         description: Id de l'utilisateur
   *     responses:
   *       200:
   *         description: Retourne la demande souhaitée
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                      id:
   *                        type: string
   *                        description: identifiant de de la demande
   *                      start_date:
   *                        type: string
   *                        format: date
   *                        description : date de début de la demande
   *                      end_date:
   *                        type: string
   *                        format: date
   *                        description : date de fin de la demande
   *                      created_at:
   *                        type: string
   *                        format: date
   *                        description: date de création de la demande
   *                      motivation:
   *                        type: string
   *                        description: motivation de la demande
   *                        required: false
   *                      justification:
   *                       type: string
   *                       description: justification de la demande
   *                       required: false
   *                      status:
   *                        type: string
   *                        description: Status actuel de la demande (DRAFT, WAITING, ACCPETED, DENIED)
   *                      number_day:
   *                        type: integer
   *                        description: nombre de jour de la demande
   *                      id_owner:
   *                        type: integer
   *                        description: id du créateur de la demande
   *                      type:
   *                        type: string
   *                        description: Type de la demande (CA, TT, RTT, ABSENCE, SICKNESS)e
   *                      id_validator:
   *                        type: integer
   *                        description: id du validateur de la demande
   *                        required: false
   *                      validator_firstname:
   *                        type: string
   *                        description: prenom du validateur de la demande
   *                        required: false
   *                      validator_lastname:
   *                        type: integer
   *                        description: nom du validateur de la demande
   *                        required: false
   *                      validated_at:
   *                        type: string
   *                        format: date
   *                        description: date de validation
   *                        required: false
   *
   *
   *       500:
   *         description: Échec de la récupération de la demande
   */
);

router.get(
  "/validation/list/:userId",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    const { code, message, data } = await DemandService.getValidatedDemand(
      req,
      +req.params.userId,
    );
    res.status(code).json({ message, data });
  },
);

/**
 * @swagger
 * /api/demand/confirm/{id_demand}:
 *   put:
 *     summary: Modifier le status d'une demande a 'ACCEPTED'
 *     description: Modifier la validation d'une demande a 'ACCEPTED' au nom de l'utilisateur validateur
 *     requestBody:
 *       required: true
 *       content:
 *         demand:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                   type: integer
 *                   description : Id de la demande
 *               validatorId:
 *                  type: integer
 *                  description: Id de la personne qui valide la demande
 *               status:
 *                  type: string
 *                  description: Status actuel de la demande (DRAFT, WAITING, ACCPETED, DENIED)
 *               validated_at:
 *                  type: string
 *                  format: date
 *                  description: date de validation de la demande
 *     responses:
 *       200:
 *         description: Modification effectuée avec succès
 *       500:
 *         description: Échec de la modification du status de la demande
 */
router.put(
  "/confirm/:id",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).token.userId;

    const { code, message, data } = await DemandService.confirmDemand(
      +req.params.id,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

/**
 * @swagger
 * /api/demand/reject/{id_demand}:
 *   put:
 *     summary: Modifier le status d'une demande a 'DENIED'
 *     description: Modifier la validation d'une demande a 'DENIED' au nom de l'utilisateur validateur
 *     requestBody:
 *       required: true
 *       content:
 *         demand:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                   type: integer
 *                   description : Id de la demande
 *               validatorId:
 *                  type: integer
 *                  description: Id de la personne qui valide la demande
 *               status:
 *                  type: string
 *                  description: Status actuel de la demande (DRAFT, WAITING, ACCPETED, DENIED)
 *               validated_at:
 *                  type: string
 *                  format: date
 *                  description: date de validation de la demande
 *     responses:
 *       200:
 *         description: Modification effectuée avec succès
 *       500:
 *         description: Échec de la modification du status de la demande
 */
router.put(
  "/reject/:id",
  verifyToken,
  hasRole([RoleEnum.ADMIN, RoleEnum.HR]),
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;

    const { code, message, data } = await DemandService.rejectDemand(
      +req.params.id,
      userId,
      req.body.justification,
    );
    res.status(code).json({ message, data });
  },
);

export default router;
