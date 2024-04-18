import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import {verifyToken} from "../middleware/AuthMiddleware";
import {ExpenseService} from "../service/ExpenseService";

const router = Router();
dotenv.config();

// Recupération des valeurs et données
router.get("/:user_id", verifyToken, async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.getExpensesValuesByUserId(req.params);
    res.status(code).json({ message, data });
});

router.get("/", verifyToken, async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.getExpensesValues(req.params);
    res.status(code).json({ message, data });
});

// Gestion des demandes liées aux frais

router.post("/", verifyToken, async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.createExpenseDemand(req.body);
    res.status(code).json({ message, data });
});

router.put("/:id", verifyToken, async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.editExpenseDemand(req.params.id, req.body);
    res.status(code).json({ message, data });
});

router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.delExpenseDemand(req.params.id);
    res.status(code).json({ message, data });
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.getExpenseDemand(req.params.id);
    res.status(code).json({ message, data });
});

router.put("/confirm/:id", verifyToken, async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.confirmExpenseDemand(req.params.id, req.body.ExpenseStatus, req.body.validatorId);
    res.status(code).json({ message, data });
});

export default router