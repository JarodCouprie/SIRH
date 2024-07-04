import { Expense, ExpenseStatus, ExpenseType } from "../../model/Expense";

export class ExpenseListDTO {
  id: string;
  type: ExpenseType;
  amount: number;
  motivation: string;
  createdAt: Date;
  facturationDate: Date;
  status: ExpenseStatus;

  constructor(expense: Expense) {
    this.id = expense.id;
    this.type = expense.type;
    this.amount = expense.amount;
    this.motivation = expense.motivation;
    this.createdAt = expense.createdAt;
    this.facturationDate = expense.facturationDate;
    this.status = expense.status;
  }
}
