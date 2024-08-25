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
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Internal server error
 */
router.get("/list/:type", verifyToken, async (req: Request, res: Response) => {
  let userId = (req as CustomRequest).token.userId;
  const { code, message, data } =
    await ExpenseService.getExpensesValuesByUserId(req, userId);
  res.status(code).json({ message, data });
});

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

router.get(
  "/amount-date-and-status/all",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } =
      await ExpenseService.getExpensesAmountDateAndStatus(req);
    res.status(code).json({ message, data });
  },
);

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
