export class ExpenseList {
  id: string;
  type: ExpenseType;
  amount: number;
  motivation: string;
  created_at: Date;
  facturation_date: Date;
  status: ExpenseStatus;
  fileUrl?: string;
  constructor(
    id: string,
    type: ExpenseType,
    amount: number,
    motivation: string,
    created_at: Date,
    facturation_date: Date,
    status: ExpenseStatus,
    fileUrl?: string,
  ) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.motivation = motivation;
    this.created_at = created_at;
    this.facturation_date = facturation_date;
    this.status = status;
    this.fileUrl = fileUrl;
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
  id: number;
  status: ExpenseStatus;
  answered_by: number;

  constructor(id: number, status: ExpenseStatus, answered_by: number) {
    this.id = id;
    this.status = status;
    this.answered_by = answered_by;
  }
}

export class ExpenseAmountDateAndStatus {
  amount: number;
  facturation_date: Date;
  status: ExpenseStatus;

  constructor(amount: number, facturation_date: Date, status: ExpenseStatus) {
    this.amount = amount;
    this.facturation_date = facturation_date;
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
