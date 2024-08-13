import { Expense } from "@/modules/expense/pages/Expense.js";
import { CreateExpense } from "@/modules/expense/pages/CreateExpense.js";
import { ExpenseDetails } from "@/modules/expense/pages/ExpenseDetails.js";

export const expenseRoutes = {
  path: "expense",
  children: [
    {
      path: "",
      element: <Expense />,
    },
    {
      path: "create",
      element: <CreateExpense />,
    },
    {
      path: "edit/:id",
      element: <CreateExpense />,
    },
    {
      path: "details/:id",
      element: <ExpenseDetails />,
    },
  ],
};
