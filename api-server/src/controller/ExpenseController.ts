import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import {verifyToken} from "../middleware/AuthMiddleware";
import {ExpenseService} from "../service/ExpenseService";

const router = Router();
dotenv.config();

// Recupération des valeurs et données
router.get("/values/:user_id", verifyToken, async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.getExpensesValuesById(req.params.user_id);
    res.status(code).json({ message, data });
});

router.get("/values", verifyToken, async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.getExpensesValues();
    res.status(code).json({ message, data });
});

router.get("/data/:user_id", verifyToken, async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.getExpensesDataById(req.params.user_id);
    res.status(code).json({ message, data });
});

router.get("/data", verifyToken, async (req: Request, res: Response) => {
    const { code, message, data } = await ExpenseService.getExpensesData();
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
    const { code, message, data } = await ExpenseService.confirmExpenseDemand(req.params.id, req.body);
    res.status(code).json({ message, data });
});

export default router