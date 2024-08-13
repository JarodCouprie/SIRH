import { Expense, ExpenseStatus } from "../../../common/model/Expense.js";

export class ExpenseAmountDateAndStatusDTO {
  amount: number;
  facturation_date: Date;
  status: ExpenseStatus;

  constructor(expense: Expense) {
    this.amount = expense.amount;
    this.facturation_date = expense.facturation_date;
    this.status = expense.status;
  }
}
