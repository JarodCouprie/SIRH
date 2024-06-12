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
  NOT_REFUNDED = "NOT REFUNDED",
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

export class ExpenseAmountDateAndStatus {
  amount: number;
  facturationDate: Date;
  status: ExpenseStatus;

  constructor(amount: number, facturationDate: Date, status: ExpenseStatus) {
    this.amount = amount;
    this.facturationDate = facturationDate;
    this.status = status;
  }
}

export class ExpenseCardModel {
  amount: number;
  invoicesAmount: number;

  constructor(amount: number, invoicesAmount: number) {
    this.amount = amount;
    this.invoicesAmount = invoicesAmount;
  }
}
export enum selectedTypeEnum {
  "ALL" = "ALL",
  TRAVEL = "TRAVEL",
  COMPENSATION = "COMPENSATION",
  FOOD = "FOOD",
  HOUSING = "HOUSING",
}
