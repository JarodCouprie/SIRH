import { test } from "vitest";
import { Expense, ExpenseStatus, ExpenseType } from "../common/model/Expense";
import { ExpenseRepository } from "../resources/expense/ExpenseRepository";
import { undefined } from "zod";

// https://vitest.dev/api/

test("Add expense to first user", async () => {
  const expense: Expense = {
    amount: 500,
    created_at: new Date(),
    facturation_date: new Date(),
    id: "1",
    id_owner: 1,
    id_validator: 0,
    justification: "justif",
    motivation: "motiv",
    status: ExpenseStatus.WAITING,
    type: ExpenseType.FOOD,
  };
  const createExpense = await ExpenseRepository.createExpenseDemand(expense);
  const createdExpense: Expense = await ExpenseRepository.getExpenseDemand("1");
});

test("Get first 10 Expenses", async () => {
  const offset = "0";
  const limit = "10";

  const expenses: Expense[] = await ExpenseRepository.getExpensesValues(
    +offset,
    +limit,
  );
});
