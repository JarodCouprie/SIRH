export class ExpenseList {
  type: ExpenseType;
  amount: number;
  motivation: string;
  createdAt: Date;
  facturationDate: Date;
  status: ExpenseStatus;
  constructor(
    type: ExpenseType,
    amount: number,
    motivation: string,
    createdAt: Date,
    facturationDate: Date,
    status: ExpenseStatus,
  ) {
    this.type = type;
    this.amount = amount;
    this.motivation = motivation;
    this.createdAt = createdAt;
    this.facturationDate = facturationDate;
    this.status = status;
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
