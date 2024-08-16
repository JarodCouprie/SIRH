export class Expense {
  id: string;
  type: ExpenseType;
  amount: number;
  motivation: string;
  created_at: Date;
  facturation_date: Date;
  status: ExpenseStatus;
  id_owner: number;
  fileKey?: string;
  id_validator: number;
  justification: string;
  validator_firstname: string;
  validator_lastname: string;
  validated_at: Date;

  constructor(
    id: string,
    type: ExpenseType,
    amount: number,
    motivation: string,
    created_at: Date,
    facturation_date: Date,
    status: ExpenseStatus,
    ownerId: number,
    id_validator: number,
    justification: string,
    validator_firstname: string,
    validator_lastname: string,
    validated_at: Date,
    fileKey?: string,
  ) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.motivation = motivation;
    this.created_at = created_at;
    this.facturation_date = created_at;
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
