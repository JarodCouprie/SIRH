import { ExpenseRepository } from "../repository/ExpenseRepository";
import {Expense, ExpenseResponse, ExpenseStatus} from "../model/Expense";

export class ExpenseService {

    public static async getExpensesValuesByUserId(params:any){

    }

    public static async getExpensesValues(params:any){

    }

    public static async createExpenseDemand(expense:Expense) {

    }

    public static async editExpenseDemand(id:string, expense:Expense) {

    }

    public static async delExpenseDemand(id:string){

    }

    public static async getExpenseDemand(id:string) {

    }

    public static async confirmExpenseDemand(id:string, status:ExpenseStatus,validatorId:string) {

    }
}
