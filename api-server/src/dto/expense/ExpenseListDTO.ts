import {Expense, ExpenseType} from "../../model/Expense";

export class ExpenseListDTO {
    type: ExpenseType;
    amount: number;
    motivation:string;
    createdAt: Date;
    facturationDate: Date;

    constructor(expense:Expense) {
        this.type = expense.type;
        this.amount = expense.amount;
        this.motivation = expense.motivation;
        this.createdAt = expense.createdAt;
        this.facturationDate = expense.facturationDate;
    }
}