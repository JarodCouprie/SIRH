import { User } from "./User";

export class Expense {
  id: string;
  type: ExpenseType;
  amount: number;
  motivation: string;
  created_at: Date;
  facturation_date: Date;
  status: ExpenseStatus;
  id_owner: number;
  userValidateId?: number;

  constructor(
    id: string,
    type: ExpenseType,
    amount: number,
    motivation: string,
    created_at: Date,
    facturation_date: Date,
    status: ExpenseStatus,
    ownerId: number,
    userValidateId?: number,
  ) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.motivation = motivation;
    this.created_at = created_at;
    this.facturation_date = created_at;
    this.status = status;
    this.id_owner = ownerId;
    this.userValidateId = userValidateId;
  }
}

export enum ExpenseType {
  TRAVEL = "TRAVEL",
  COMPENSATION = "COMPENSATION",
  FOOD = "FOOD",
  HOUSING = "HOUSING",
}

export enum ExpenseStatus {
  REFUNDED = "REFUNDED",
  NOT_REFUNDED = "NOT_REFUNDED",
  WAITING = "WAITING",
}

export class ExpenseResponse {
  status: ExpenseStatus;
  motivation: string;
  answeredAt: Date;
  answeredBy: number;

  constructor(
    status: ExpenseStatus,
    motivation: string,
    answeredAt: Date,
    answeredBy: number,
  ) {
    this.status = status;
    this.motivation = motivation;
    this.answeredAt = answeredAt;
    this.answeredBy = answeredBy;
  }
}
