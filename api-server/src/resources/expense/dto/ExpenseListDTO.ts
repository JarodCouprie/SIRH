import { Expense } from "../../../common/model/Expense.js";
import { ExpenseType } from "../../../common/enum/ExpenseType";
import { ExpenseStatus } from "../../../common/enum/ExpenseStatus";

export class ExpenseListDTO {
  id: number;
  type: ExpenseType;
  amount: number;
  motivation: string;
  created_at: Date;
  facturation_date: Date;
  status: ExpenseStatus;
  id_owner: number;
  fileUrl?: string;
  id_validator: number;
  justification: string;
  validator_firstname?: string;
  validator_lastname?: string;
  validated_at?: Date;

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
    this.id_validator = expense.id_validator;
    this.justification = expense.justification;
    this.validator_firstname = expense.validator_firstname;
    this.validator_lastname = expense.validator_lastname;
    this.validated_at = expense.validated_at;
  }
}

export class ExpenseValidation {
  id: number;
  id_validator: number;
  validated_at: string;

  constructor(id: number, id_validator: number) {
    this.id = id;
    this.id_validator = id_validator;
    this.validated_at = new Date()
      .toISOString()
      .split("Z")[0]
      .replace("T", " ")
      .split(".")[0];
  }
}

export class ExpenseInvalidation {
  id: number;
  justification: string;
  id_validator: number;
  validated_at: string;

  constructor(id: number, justification: string, id_validator: number) {
    this.id = id;
    this.justification = justification;
    this.id_validator = id_validator;
    this.validated_at = new Date()
      .toISOString()
      .split("Z")[0]
      .replace("T", " ")
      .split(".")[0];
  }
}
