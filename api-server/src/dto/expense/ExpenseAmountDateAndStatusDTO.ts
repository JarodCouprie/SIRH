import { Expense, ExpenseStatus, ExpenseType } from "../../model/Expense";

export class ExpenseAmountDateAndStatusDTO {
  amount: number;
  facturationDate: Date;
  status: ExpenseStatus;

  constructor(expense: Expense) {
    this.amount = expense.amount;
    this.facturationDate = expense.facturationDate;
    this.status = expense.status;
  }
}
