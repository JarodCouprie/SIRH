import { ExpenseStatus } from "../enum/ExpenseStatus";
import { ExpenseType } from "../enum/ExpenseType";

export class Expense {
  id: number;
  type: ExpenseType;
  amount: number;
  motivation: string;
  created_at: Date;
  facturation_date: Date;
  status: ExpenseStatus;
  id_owner: number;
  fileKey?: string;
  id_validator?: number;
  justification?: string;
  validator_firstname?: string;
  validator_lastname?: string;
  validated_at?: Date;

  constructor(
    id: number,
    type: ExpenseType,
    amount: number,
    motivation: string,
    created_at: Date,
    facturation_date: Date,
    status: ExpenseStatus,
    ownerId: number,
    id_validator?: number,
    justification?: string,
    validator_firstname?: string,
    validator_lastname?: string,
    validated_at?: Date,
    fileKey?: string,
  ) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.motivation = motivation;
    this.created_at = created_at;
    this.facturation_date = facturation_date;
    this.status = status || ExpenseStatus.WAITING;
    this.id_owner = ownerId;
    this.fileKey = fileKey;
    this.id_validator = id_validator;
    this.justification = justification;
    this.validator_firstname = validator_firstname;
    this.validator_lastname = validator_lastname;
    this.validated_at = validated_at;
  }
}
