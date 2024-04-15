import {User} from "./User";

export class Expense {
    type: ExpenseType;
    amount: number;
    motivation: string;
    createdAt: Date;
    status: ExpenseStatus;
    ownerId: number;
    userValidateId?: number;

    constructor(
        type: ExpenseType,
        amount: number,
        motivation: string,
        createdAt: Date,
        status: ExpenseStatus,
        ownerId: number,
        userValidateId?: number) {
        this.type = type;
        this.amount = amount;
        this.motivation = motivation;
        this.createdAt = createdAt;
        this.status = status;
        this.ownerId = ownerId;
        this.userValidateId = userValidateId;
    }
}

export enum ExpenseType {
    TRAVEL = "TRAVEL",
    COMPENSATION = "COMPENSATION",
    FOOD = "FOOD",
    HOUSING = "HOUSING"

}

export enum ExpenseStatus {
    REFUNDED = "REFUNDED",
    NOT_REFUNDED = "NOT_REFUNDED",
    WAITING = "WAITING"
}

export class ExpenseResponse {
    status: ExpenseStatus;
    motivation: string;
    answeredAt: Date;
    answeredBy: number;

    constructor(status: ExpenseStatus, motivation: string, answeredAt: Date, answeredBy: number) {
        this.status = status;
        this.motivation = motivation;
        this.answeredAt = answeredAt;
        this.answeredBy = answeredBy;
    }
}