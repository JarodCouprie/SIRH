import { ExpenseRepository } from "../repository/ExpenseRepository";
import { Expense, ExpenseStatus, ExpenseType } from "../model/Expense";
import { ExpenseListDTO } from "../dto/expense/ExpenseListDTO";
import { ControllerResponse } from "../helper/ControllerResponse";
import { logger } from "../helper/Logger";
import { Request } from "express";
import { ExpenseAmountDateAndStatusDTO } from "../dto/expense/ExpenseAmountDateAndStatusDTO";
import { CustomRequest } from "../helper/CustomRequest";
import { MinioClient } from "../helper/MinioClient";

export class ExpenseService {
  public static async getExpensesValuesByUserId(req: Request, userId: number) {
    try {
      const offset = req.query.offset || "0";
      const limit = req.query.limit || "10";
      const type = req.query.type || null;

      if (type != null) {
        const expenses: Expense[] =
          await ExpenseRepository.getExpensesValuesByUserIdAndType(
            userId,
            +offset,
            +limit,
            type.toString(),
          );
        const expensesListDto: ExpenseListDTO[] = expenses.map(
          (expense: Expense) => new ExpenseListDTO(expense),
        );
        return new ControllerResponse<ExpenseListDTO[]>(
          200,
          "",
          expensesListDto,
        );
      }
      const expenses: Expense[] =
        await ExpenseRepository.getExpensesValuesByUserId(
          userId,
          +offset,
          +limit,
        );
      const expensesListDto: ExpenseListDTO[] = expenses.map(
        (expense: Expense) => new ExpenseListDTO(expense),
      );
      return new ControllerResponse<ExpenseListDTO[]>(200, "", expensesListDto);
    } catch (error) {
      logger.error(`Failed to get expenses. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get expenses");
    }
  }

  public static async getExpensesValues(req: Request) {
    try {
      const offset = req.query.offset || "0";
      const limit = req.query.limit || "10";
      const type = req.query.type || null;

      if (type != null) {
        const expenses: Expense[] =
          await ExpenseRepository.getExpensesValuesByType(
            +offset,
            +limit,
            type.toString(),
          );
        const expensesListDto: ExpenseListDTO[] = expenses.map(
          (expense: Expense) => new ExpenseListDTO(expense),
        );
        return new ControllerResponse<ExpenseListDTO[]>(
          200,
          "",
          expensesListDto,
        );
      }
      const expenses: Expense[] = await ExpenseRepository.getExpensesValues(
        +offset,
        +limit,
      );
      const expensesListDto: ExpenseListDTO[] = expenses.map(
        (expense: Expense) => new ExpenseListDTO(expense),
      );
      return new ControllerResponse<ExpenseListDTO[]>(200, "", expensesListDto);
    } catch (error) {
      logger.error(`Failed to get expenses. Error in Service: ${error}`);
      return new ControllerResponse(500, "Failed to get expenses");
    }
  }

  public static async createExpenseDemand(req: Request, userId: number) {
    try {
      let expense: Expense = JSON.parse(req.body.body);
      expense.id_owner = userId;
      expense.status = ExpenseStatus.WAITING;

      let key: string;
      if (req.file) {
        const file = req.file;
        key = `user/${userId}/expense/${file.originalname}`;
        await MinioClient.putObjectToBucket(key, file);
        expense.fileKey = key;
      }

      const result: any = await ExpenseRepository.createExpenseDemand(expense);
      return new ControllerResponse(200, "Operation was a success");
    } catch (error) {
      logger.error(`Failed to create expenses. Error: ${error}`);
      return new ControllerResponse(500, "Failed to create expenses");
    }
  }

  public static async editExpenseDemand(req: Request, userId: number) {
    try {
      const targetExpense: Expense = await ExpenseRepository.getExpenseDemand(
        req.params.id,
      );
      if (targetExpense.id_owner != userId)
        return new ControllerResponse(403, "Access unauthorized");

      let expense: Expense = JSON.parse(req.body.body);

      let key: string;
      if (req.file) {
        const file = req.file;
        key = `user/${userId}/expense/${file.originalname}`;
        await MinioClient.putObjectToBucket(key, file);
        expense.fileKey = key;
      }

      const result: any = await ExpenseRepository.updateExpenseDemand(
        req.params.id,
        expense,
      );
      return new ControllerResponse(200, "Operation was a success");
    } catch (error) {
      logger.error(`Failed to update expenses. Error: ${error}`);
      return new ControllerResponse(500, "Failed to update expenses");
    }
  }

  public static async delExpenseDemand(id: string, userId: number) {
    try {
      const targetExpense: Expense =
        await ExpenseRepository.getExpenseDemand(id);
      if (targetExpense.id_owner != userId)
        return new ControllerResponse(403, "Access unauthorized");

      const result: any = await ExpenseRepository.delExpenseDemand(id);
      return new ControllerResponse(200, "Operation was a success");
    } catch (error) {
      logger.error(`Failed to delete expenses. Error: ${error}`);
      return new ControllerResponse(500, "Failed to delete expenses");
    }
  }

  public static async getExpenseDemand(id: string, userId: number) {
    try {
      const expenseTemp = await ExpenseRepository.getExpenseDemand(id);

      const expense: ExpenseListDTO = new ExpenseListDTO(
        expenseTemp,
        await MinioClient.getSignedUrl(expenseTemp.file_key),
      );
      if (expense.id_owner != userId)
        return new ControllerResponse(403, "Access denied");

      return new ControllerResponse<ExpenseListDTO>(200, "", expense);
    } catch (error) {
      logger.error(`Failed to get expense. Error: ${error}`);
      return new ControllerResponse<ExpenseListDTO>(
        500,
        "Failed to get expense",
      );
    }
  }

  public static async confirmExpenseDemand(req: Request, userId: number) {
    try {
      const status = req.body.ExpenseStatus;
      const result: any = await ExpenseRepository.confirmExpenseDemand(
        +req.params.id,
        status,
        userId,
      );
      return new ControllerResponse(200, "Operation was a success");
    } catch (error) {
      logger.error(`Failed to confirm expenses. Error: ${error}`);
      return new ControllerResponse(500, "Failed to confirm expenses");
    }
  }

  public static async getExpensesCount(req: Request) {
    try {
      const type: string = req.query.type?.toString() || "ALL";
      let count: number;
      if (type == null || type == "ALL") {
        const result: any = await ExpenseRepository.getExpensesCount();
        count = result;
      } else {
        const result: any =
          await ExpenseRepository.getExpensesCountByType(type);
        count = result;
      }
      return new ControllerResponse<number>(200, "", count);
    } catch (error) {
      logger.error(`Failed to get expenses. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get expenses");
    }
  }

  public static async getExpensesCountByUserId(req: Request, userId: number) {
    try {
      const type = req.query.type?.toString() || "ALL";
      let count;
      if (type == null || type == "ALL") {
        const result: any =
          await ExpenseRepository.getExpensesCountByUserId(userId);
        count = result;
      } else {
        const result: any =
          await ExpenseRepository.getExpensesCountByTypeAndUserId(type, userId);
        count = result;
      }
      return new ControllerResponse<number>(200, "", count);
    } catch (error) {
      logger.error(`Failed to get expenses. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get expenses");
    }
  }

  public static async getExpensesAmountDateAndStatus(req: Request) {
    try {
      const expenses: Expense[] =
        await ExpenseRepository.getExpensesAmountDateAndStatus();

      const expensesAmountDateAndStatusDTO: ExpenseAmountDateAndStatusDTO[] =
        expenses.map(
          (expense: Expense) => new ExpenseAmountDateAndStatusDTO(expense),
        );
      return new ControllerResponse<ExpenseAmountDateAndStatusDTO[]>(
        200,
        "",
        expensesAmountDateAndStatusDTO,
      );
    } catch (error) {
      logger.error(`Failed to get expenses. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Failed to get expenses amount and facturation date",
      );
    }
  }

  public static async getExpensesAmountDateAndStatusByUserId(
    req: Request,
    userId: number,
  ) {
    try {
      const user_id = userId.toString();
      const expenses: Expense[] =
        await ExpenseRepository.getExpensesAmountDateAndStatusByUserId(user_id);

      const expensesAmountDateAndStatusDTO: ExpenseAmountDateAndStatusDTO[] =
        expenses.map(
          (expense: Expense) => new ExpenseAmountDateAndStatusDTO(expense),
        );
      return new ControllerResponse<ExpenseAmountDateAndStatusDTO[]>(
        200,
        "",
        expensesAmountDateAndStatusDTO,
      );
    } catch (error) {
      logger.error(`Failed to get expenses. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Failed to get expenses amount and facturation date",
      );
    }
  }

  public static async getExpensesAmountDateAndStatusByDate(req: Request) {
    try {
      const selectedDate =
        req.query.date?.toString() || new Date().toDateString();
      const monthName = new Date(selectedDate).toLocaleDateString("eng", {
        month: "long",
      });
      const year = new Date(selectedDate).getFullYear().toString();
      console.log(monthName, selectedDate);
      const expenses: Expense[] =
        await ExpenseRepository.getExpensesAmountDateAndStatusByDate(
          monthName,
          year,
        );

      const expensesAmountDateAndStatusDTO: ExpenseAmountDateAndStatusDTO[] =
        expenses.map(
          (expense: Expense) => new ExpenseAmountDateAndStatusDTO(expense),
        );
      return new ControllerResponse<ExpenseAmountDateAndStatusDTO[]>(
        200,
        "",
        expensesAmountDateAndStatusDTO,
      );
    } catch (error) {
      logger.error(`Failed to get expenses. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Failed to get expenses amount and facturation date",
      );
    }
  }

  public static async getExpensesAmountDateAndStatusByUserIdAndDate(
    req: Request,
    userId: number,
  ) {
    try {
      const selectedDate: string =
        req.query.date?.toString() || new Date().toDateString();
      const monthName = new Date(selectedDate).toLocaleDateString("eng", {
        month: "long",
      });
      const year = new Date(selectedDate).getFullYear().toString();
      const expenses: Expense[] =
        await ExpenseRepository.getExpensesAmountDateAndStatusByUserIdAndDate(
          userId,
          monthName,
          year,
        );

      const expensesAmountDateAndStatusDTO: ExpenseAmountDateAndStatusDTO[] =
        expenses.map(
          (expense: Expense) => new ExpenseAmountDateAndStatusDTO(expense),
        );
      return new ControllerResponse<ExpenseAmountDateAndStatusDTO[]>(
        200,
        "",
        expensesAmountDateAndStatusDTO,
      );
    } catch (error) {
      logger.error(`Failed to get expenses. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Failed to get expenses amount and facturation date",
      );
    }
  }
}
