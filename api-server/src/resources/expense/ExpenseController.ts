import { Request, Response, Router } from "express";
import { verifyToken } from "../../common/middleware/AuthMiddleware.js";
import { ExpenseService } from "./ExpenseService.js";
import { CustomRequest } from "../../common/helper/CustomRequest.js";
import dotenv from "dotenv";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Set the file size limit (50MB in this case)
});
dotenv.config();

// Recupération des valeurs et données
/**
 * @swagger
 * /api/expense/list/{type}:
 *   get:
 *     summary: Récupère les demandes de frais de l'utilisateur.
 *     description: Récupère les demandes de frais de l'utilisateur selon l'ID passé par le JWT Token.
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type de demande de frais
 *     responses:
 *       200:
 *         description: Retourne les demandes de frais souhaitées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expenses:
 *                   type: array
 *                   description: Liste des demandes de frais retrouvées
 *                   items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: identifiant de l'expense
 *                      type:
 *                        type: string
 *                        description: Type de la demande (TRAVEL, COMPENSATION, FOOD, HOUSING)
 *                      amount:
 *                        type: integer
 *                        description : montant en euro de la demande
 *                      motivation:
 *                        type: string
 *                        description: Justification et explication du contexte de la demande
 *                      created_at:
 *                        type: string
 *                        format: date
 *                        description: date de création de la demande
 *                      facturation_date:
 *                       type: string
 *                       format: date
 *                       description: date de facturation de la demande
 *                      status:
 *                        type: string
 *                        description: Status actuel de la demande (REFUNDED, NOT_REFUNDED, WAITING)
 *                      id_owner:
 *                        type: integer
 *                        description: id de l'utilisateur propriétaire de la demande
 *                      fileUrl:
 *                        type: string
 *                        description: lien vers le fichier joint à la demande
 *                        required: false
 *                      id_validator:
 *                        type: integer
 *                        description: id de l'utilisateur ayant validé la demande s'il y en a un
 *                        required: false
 *                      justification:
 *                        type: string
 *                        description: justification du choix en cas de refus de la demande
 *                      validator_firstname:
 *                        type: string
 *                        description: prénom du validateur
 *                        required: false
 *                      validator_lastname:
 *                        type: string
 *                        description: prénom du validateur
 *                        required: false
 *                      validated_at:
 *                        type: string
 *                        format: date
 *                        description: date de validation
 *                        required: false
 *
 *                 totalExpensesCount:
 *                   type: integer
 *                   description: Nombre de demandes trouvées
 *       500:
 *         description: Échec de la récupération de la demande
 */
router.get("/list/:type", verifyToken, async (req: Request, res: Response) => {
  let userId = (req as CustomRequest).token.userId;
  const { code, message, data } =
    await ExpenseService.getExpensesValuesByUserId(req, userId);
  res.status(code).json({ message, data });
});

/**
 * @swagger
 * /api/expense/list/all/{type}:
 *   get:
 *     summary: Récupère les demandes de frais des utilisateurs.
 *     description: Récupère les demandes de frais de tous les utilisateurs selon le type indiqué
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type de demande de frais
 *     responses:
 *       200:
 *         description: Retourne les demandes de frais souhaitées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expenses:
 *                   type: array
 *                   description: Liste des demandes de frais retrouvées
 *                   items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: identifiant de l'expense
 *                      type:
 *                        type: string
 *                        description: Type de la demande (TRAVEL, COMPENSATION, FOOD, HOUSING)
 *                      amount:
 *                        type: integer
 *                        description : montant en euro de la demande
 *                      motivation:
 *                        type: string
 *                        description: Justification et explication du contexte de la demande
 *                      created_at:
 *                        type: string
 *                        format: date
 *                        description: date de création de la demande
 *                      facturation_date:
 *                       type: string
 *                       format: date
 *                       description: date de facturation de la demande
 *                      status:
 *                        type: string
 *                        description: Status actuel de la demande (REFUNDED, NOT_REFUNDED, WAITING)
 *                      id_owner:
 *                        type: integer
 *                        description: id de l'utilisateur propriétaire de la demande
 *                      fileUrl:
 *                        type: string
 *                        description: lien vers le fichier joint à la demande
 *                        required: false
 *                      id_validator:
 *                        type: integer
 *                        description: id de l'utilisateur ayant validé la demande s'il y en a un
 *                        required: false
 *                      justification:
 *                        type: string
 *                        description: justification du choix en cas de refus de la demande
 *                      validator_firstname:
 *                        type: string
 *                        description: prénom du validateur
 *                        required: false
 *                      validator_lastname:
 *                        type: string
 *                        description: prénom du validateur
 *                        required: false
 *                      validated_at:
 *                        type: string
 *                        format: date
 *                        description: date de validation
 *                        required: false
 *
 *                 totalExpensesCount:
 *                   type: integer
 *                   description: Nombre de demandes trouvées
 *       500:
 *         description: Échec de la récupération de la demande
 */
router.get(
  "/list/all/:type",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.getExpensesValues(req);
    res.status(code).json({ message, data });
  },
);

router.get(
  "/validation/list/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { code, message, data } =
      await ExpenseService.getExpensesValidationList(req, +id);
    res.status(code).json({ message, data });
  },
);

/**
 * @swagger
 * /api/expense/amount-date-and-status:
 *   get:
 *     summary: Récupère des données précises des demandes de frais de l'utilisateur.
 *     description: Récupère le montant, la date de facturation et le status des demandes de frais de l'utilisateur selon l'ID passé par le JWT Token.
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type de demande de frais
 *     responses:
 *       200:
 *         description: Retourne les demandes de frais souhaitées
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              description: Liste des demandes de frais retrouvées
 *              items:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: integer
 *                   description : montant en euro de la demande
 *                 facturation_date:
 *                  type: string
 *                  format: date
 *                  description: date de facturation de la demande
 *                 status:
 *                   type: string
 *                   description: Status actuel de la demande (REFUNDED, NOT_REFUNDED, WAITING)
 *       500:
 *         description: Échec de la récupération de la demande
 */
router.get(
  "/amount-date-and-status/",
  verifyToken,
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;
    const { code, message, data } =
      await ExpenseService.getExpensesAmountDateAndStatusByUserId(req, userId);
    res.status(code).json({ message, data });
  },
);

/**
 * @swagger
 * /api/expense/amount-date-and-status/all:
 *   get:
 *     summary: Récupère des données précises des demandes de tous les utilisateurs.
 *     description: Récupère le montant, la date de facturation et le status des demandes de frais de tous les utilisateurs.
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type de demande de frais
 *     responses:
 *       200:
 *         description: Retourne les demandes de frais souhaitées
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              description: Liste des demandes de frais retrouvées
 *              items:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: integer
 *                   description : montant en euro de la demande
 *                 facturation_date:
 *                  type: string
 *                  format: date
 *                  description: date de facturation de la demande
 *                 status:
 *                   type: string
 *                   description: Status actuel de la demande (REFUNDED, NOT_REFUNDED, WAITING)
 *       500:
 *         description: Échec de la récupération de la demande
 */
router.get(
  "/amount-date-and-status/all",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } =
      await ExpenseService.getExpensesAmountDateAndStatus(req);
    res.status(code).json({ message, data });
  },
);

/**
 * @swagger
 * /api/expense/amount-date-and-status-by-date:
 *   get:
 *     summary: Récupère les demandes de frais de l'utilisateur.
 *     description: Récupère les demandes de frais de l'utilisateur selon l'ID passé par le JWT Token sur le mois glissant.
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type de demande de frais
 *     responses:
 *       200:
 *         description: Retourne les demandes de frais souhaitées
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              description: Liste des demandes de frais retrouvées
 *              items:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: integer
 *                   description : montant en euro de la demande
 *                 facturation_date:
 *                  type: string
 *                  format: date
 *                  description: date de facturation de la demande
 *                 status:
 *                   type: string
 *                   description: Status actuel de la demande (REFUNDED, NOT_REFUNDED, WAITING)
 *       500:
 *         description: Échec de la récupération de la demande
 */
router.get(
  "/amount-date-and-status-by-date",
  verifyToken,
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;
    const { code, message, data } =
      await ExpenseService.getExpensesAmountDateAndStatusByUserIdAndDate(
        req,
        userId,
      );
    res.status(code).json({ message, data });
  },
);

router.get(
  "/amount-date-and-status-by-date/all",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } =
      await ExpenseService.getExpensesAmountDateAndStatusByDate(req);
    res.status(code).json({ message, data });
  },
);

router.get("/count/:type", verifyToken, async (req: Request, res: Response) => {
  let userId = (req as CustomRequest).token.userId;
  const { code, message, data } = await ExpenseService.getExpensesCountByUserId(
    req,
    userId,
  );
  res.status(code).json({ message, data });
});

router.get(
  "/count/all/:type",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.getExpensesCount(req);
    res.status(code).json({ message, data });
  },
);

// Gestion des demandes liées aux frais

router.put(
  "/:id",
  verifyToken,
  upload.single("file"),
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;

    const { code, message, data } = await ExpenseService.editExpenseDemand(
      req,
      userId,
    );
    res.status(code).json({ message, data });
  },
);
router.put(
  "/status/validation/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;

    const { code, message, data } = await ExpenseService.confirmExpense(
      +req.params.id,
      userId,
    );
    res.status(code).json({ message, data });
  },
);
router.put(
  "/status/invalidation/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;

    const { code, message, data } = await ExpenseService.rejectExpense(
      +req.params.id,
      userId,
      req,
    );
    res.status(code).json({ message, data });
  },
);

router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  let userId = (req as CustomRequest).token.userId;
  const { code, message, data } = await ExpenseService.delExpenseDemand(
    req.params.id,
    userId,
  );
  res.status(code).json({ message, data });
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  let userId = (req as CustomRequest).token.userId;
  const { code, message, data } = await ExpenseService.getExpenseDemand(
    req.params.id,
    userId,
  );
  res.status(code).json({ message, data });
});

router.put("/confirm/:id", verifyToken, async (req: Request, res: Response) => {
  let userId = (req as CustomRequest).token.userId;
  const { code, message, data } = await ExpenseService.confirmExpenseDemand(
    req,
    userId,
  );
  res.status(code).json({ message, data });
});

/**
 * @swagger
 * /api/expense/:
 *   post:
 *     summary: Créer une nouvelle demande de frais
 *     description: Créer une nouvelle demande de frais au nom de l'utilisateur connecté
 *     requestBody:
 *       required: true
 *       content:
 *         expense:
 *           schema:
 *             type: object
 *             properties:
 *                type:
 *                  type: string
 *                  description: Type de la demande (TRAVEL, COMPENSATION, FOOD, HOUSING)
 *                amount:
 *                  type: integer
 *                  description : montant en euro de la demande
 *                motivation:
 *                  type: string
 *                  description: Justification et explication du contexte de la demande
 *                facturation_date:
 *                 type: string
 *                 format: date
 *                 description: date de facturation de la demande
 *                status:
 *                  type: string
 *                  description: Status actuel de la demande (REFUNDED, NOT_REFUNDED, WAITING)
 *                fileUrl:
 *                  type: string
 *                  description: lien vers le fichier joint à la demande
 *                  required: false
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
    const { code, message, data } = await ExpenseService.createExpenseDemand(
      req,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

export default router;

//   validateExpenseData(expenseCreateSchema),
