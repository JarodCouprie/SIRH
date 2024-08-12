import { Expense } from "@/pages/expense/Expense.tsx";
import { CreateExpense } from "@/pages/expense/CreateExpense.tsx";
import { ExpenseDetails } from "@/pages/expense/ExpenseDetails.tsx";

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
