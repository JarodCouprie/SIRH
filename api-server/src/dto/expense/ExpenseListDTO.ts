import { Expense, ExpenseStatus, ExpenseType } from "../../model/Expense.js";

export class ExpenseListDTO {
  id: string;
  type: ExpenseType;
  amount: number;
  motivation: string;
  created_at: Date;
  facturation_date: Date;
  status: ExpenseStatus;
  id_owner: number;
  fileUrl?: string;

  constructor(expense: Expense, url?: string) {
    this.id = expense.id;
    this.type = expense.type;
    this.amount = expense.amount;
    this.motivation = expense.motivation;
    this.created_at = expense.created_at;
    this.facturation_date = expense.facturation_date;
    this.status = expense.status;
    this.id_owner = expense.id_owner;
    this.fileUrl = url;
  }
}
