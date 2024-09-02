import { Expense } from "../../../common/model/Expense.js";
import { ExpenseStatus } from "../../../common/enum/ExpenseStatus";

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
