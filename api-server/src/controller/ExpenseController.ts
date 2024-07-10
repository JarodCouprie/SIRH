import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { verifyToken } from "../middleware/AuthMiddleware";
import { ExpenseService } from "../service/ExpenseService";
import { CustomRequest } from "../helper/CustomRequest";
import {
  validateData,
  validateExpenseData,
} from "../middleware/ValidationMiddleware";
import { demandCreateSchema } from "../schema/demand.schema";
import { expenseCreateSchema } from "../schema/expense.schema";

const router = Router();
dotenv.config();

// Recupération des valeurs et données
router.get("/list", verifyToken, async (req: Request, res: Response) => {
  let userId = (req as CustomRequest).token.userId;
  const { code, message, data } =
    await ExpenseService.getExpensesValuesByUserId(req, userId);
  res.status(code).json({ message, data });
});

router.get("/list/all", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await ExpenseService.getExpensesValues(req);
  res.status(code).json({ message, data });
});

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

router.get("/count", verifyToken, async (req: Request, res: Response) => {
  let userId = (req as CustomRequest).token.userId;
  const { code, message, data } = await ExpenseService.getExpensesCountByUserId(
    req,
    userId,
  );
  res.status(code).json({ message, data });
});

router.get("/count/all", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await ExpenseService.getExpensesCount(req);
  res.status(code).json({ message, data });
});

// Gestion des demandes liées aux frais

router.put(
  "/:id",
  verifyToken,
  validateExpenseData(expenseCreateSchema),
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;

    const { code, message, data } = await ExpenseService.editExpenseDemand(
      req.params.id,
      req.body,
      userId,
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
  validateExpenseData(expenseCreateSchema),
  async (req: Request, res: Response) => {
    let userId = (req as CustomRequest).token.userId;
    const { code, message, daSta } = await ExpenseService.createExpenseDemand(
      req.body,
      userId,
    );
    res.status(code).json({ message, data });
  },
);

export default router;
