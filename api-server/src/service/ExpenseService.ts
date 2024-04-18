import { ExpenseRepository } from "../repository/ExpenseRepository";
import {Expense, ExpenseResponse, ExpenseStatus} from "../model/Expense";
import {UserRepository} from "../repository/UserRepository";
import {ExpenseListDTO} from "../dto/expense/ExpenseListDTO";
import {ControllerResponse} from "../helper/ControllerResponse";
import {User, UserDTO} from "../model/User";
import {logger} from "../helper/Logger";

export class ExpenseService {

    public static async getExpensesValuesByUserId(params:any){
        try{
            const expenses: Expense[] = await ExpenseRepository.getExpensesValuesByUserId(params.user_id,+params.offset, +params.limit);
            const expensesListDto: ExpenseListDTO[] = expenses.map((expense: Expense) => new ExpenseListDTO(expense));
            return new ControllerResponse<ExpenseListDTO[]>(200, "", expensesListDto);
        } catch (error) {
            logger.error(`Failed to get expenses. Error: ${error}`);
            return new ControllerResponse(500, "Failed to get expenses");
        }
    }

    public static async getExpensesValues(params:any){
        try{
            const expenses: Expense[] = await ExpenseRepository.getExpensesValues(+params.offset, +params.limit);
            const expensesListDto: ExpenseListDTO[] = expenses.map((expense: Expense) => new ExpenseListDTO(expense));
            return new ControllerResponse<ExpenseListDTO[]>(200, "", expensesListDto);
        } catch (error) {
            logger.error(`Failed to get expenses. Error: ${error}`);
            return new ControllerResponse(500, "Failed to get expenses");
        }
    }

    public static async createExpenseDemand(expense:Expense) {
        try {
            const result: any = await ExpenseRepository.createExpenseDemand(expense);
            return new ControllerResponse(200, "Operation was a success");
        }catch(error) {
            logger.error(`Failed to create expenses. Error: ${error}`);
            return new ControllerResponse(500, "Failed to create expenses");
        }
    }

    public static async editExpenseDemand(id:string, expense:Expense) {
        try {
            const result: any = await ExpenseRepository.updateExpenseDemand(id, expense);
            return new ControllerResponse(200, "Operation was a success");
        }catch(error) {
            logger.error(`Failed to update expenses. Error: ${error}`);
            return new ControllerResponse(500, "Failed to update expenses");
        }
    }

    public static async delExpenseDemand(id:string){
        try {
            const result: any = await ExpenseRepository.delExpenseDemand(id);
            return new ControllerResponse(200, "Operation was a success");
        }catch(error) {
            logger.error(`Failed to delete expenses. Error: ${error}`);
            return new ControllerResponse(500, "Failed to delete expenses");
        }
    }

    public static async getExpenseDemand(id:string) {
        try {
            const expense: any = await ExpenseRepository.getExpenseDemand(id);
            return new ControllerResponse<ExpenseListDTO>(200, "", expense);
        }catch(error) {
            logger.error(`Failed to get expense. Error: ${error}`);
            return new ControllerResponse<ExpenseListDTO>(500, "Failed to get expense");
        }
    }

    public static async confirmExpenseDemand(id:string, status:ExpenseStatus,validatorId:string) {
        try {
            const result: any = await ExpenseRepository.confirmExpenseDemand(id, status, validatorId);
            return new ControllerResponse(200, "Operation was a success");
        }catch(error) {
            logger.error(`Failed to confirm expenses. Error: ${error}`);
            return new ControllerResponse(500, "Failed to confirm expenses");
        }
    }
}
