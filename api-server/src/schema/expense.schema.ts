import { z } from "zod";
import { ExpenseType } from "../model/Expense.js";

export const expenseCreateSchema = z
  .object({
    type: z.string(),
    facturation_date: z.date(),
    motivation: z.string(),
    amount: z.number(),
  })
  .refine(
    (type) => {
      // @ts-ignore
      return ExpenseType[type] !== undefined;
    },
    { message: "Le type est invalide" },
  );
