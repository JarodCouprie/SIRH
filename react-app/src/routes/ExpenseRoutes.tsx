import { Expense } from "@/pages/expense/Expense.tsx";
import { CreateExpense } from "@/pages/expense/CreateExpense.tsx";

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
  ],
};
