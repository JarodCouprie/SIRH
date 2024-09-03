import { ExpenseRepository } from "./ExpenseRepository.js";
import { Expense } from "../../common/model/Expense.js";
import {
  ExpenseInvalidation,
  ExpenseListDTO,
  ExpenseValidation,
} from "./dto/ExpenseListDTO.js";
import { ControllerResponse } from "../../common/helper/ControllerResponse.js";
import { logger } from "../../common/helper/Logger.js";
import { Request } from "express";
import { ExpenseAmountDateAndStatusDTO } from "./dto/ExpenseAmountDateAndStatusDTO.js";
import { MinioClient } from "../../common/helper/MinioClient.js";
import { ExpenseStatus } from "../../common/enum/ExpenseStatus";
import { CreateNotification } from "../../common/model/Notification";
import { NotificationType } from "../../common/enum/NotificationType";
import { NotificationRepository } from "../notification/NotificationRepository";
import { NotificationSender } from "../../common/helper/NotificationSender";
import { NotificationService } from "../notification/NotificationService";
import { RoleEnum } from "../../common/enum/RoleEnum";

export class ExpenseService {
  public static async getExpensesValuesByUserId(req: Request, userId: number) {
    try {
      const offset = req.query.offset || "0";
      const limit = req.query.limit || "10";
      const type = req.params.type || null;

      if (type != null && type != "ALL") {
        const expenses: Expense[] =
          await ExpenseRepository.getExpensesValuesByUserIdAndType(
            userId,
            +offset,
            +limit,
            type,
          );
        const expensesCount =
          await ExpenseRepository.getExpensesCountByTypeAndUserId(type, userId);
        const expensesListDto: ExpenseListDTO[] = expenses.map(
          (expense: Expense) => new ExpenseListDTO(expense),
        );

        const data = {
          expenses: expensesListDto,
          totalExpensesCount: expensesCount,
        };

        return new ControllerResponse(200, "", data);
      }
      const expenses: Expense[] =
        await ExpenseRepository.getExpensesValuesByUserId(
          userId,
          +offset,
          +limit,
        );
      const expensesCount =
        await ExpenseRepository.getExpensesCountByUserId(userId);
      const expensesListDto: ExpenseListDTO[] = expenses.map(
        (expense: Expense) => new ExpenseListDTO(expense),
      );

      const data = {
        expenses: expensesListDto,
        totalExpensesCount: expensesCount,
      };

      return new ControllerResponse(200, "", data);
    } catch (error) {
      logger.error(`Failed to get expenses. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Echec de la récupération des demandes de frais",
      );
    }
  }

  public static async getExpensesValidationList(req: Request, id: number) {
    try {
      const pageSize = req.query.pageSize || "0";
      const pageNumber = req.query.pageNumber || "10";
      const limit = +pageSize;
      const offset = (+pageNumber - 1) * +pageSize;

      const expenses = await ExpenseRepository.getExpensesValidationValues(
        limit,
        offset,
        id,
      );
      const expenseCount =
        await ExpenseRepository.getExpensesValidationCount(id);

      const expenseDTO: ExpenseListDTO[] = expenses.map(
        (expense: Expense) => new ExpenseListDTO(expense),
      );
      return new ControllerResponse(200, "", {
        totalData: expenseCount,
        list: expenseDTO,
      });
    } catch (error) {
      logger.error(`Failed to get expenses. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Echec de la récupération des demandes de frais",
      );
    }
  }

  public static async getExpensesValues(req: Request) {
    try {
      const offset = req.query.offset || "0";
      const limit = req.query.limit || "10";
      const type = req.params.type || null;

      if (type != null) {
        const expenses: Expense[] =
          await ExpenseRepository.getExpensesValuesByType(
            +offset,
            +limit,
            type,
          );
        const expensesCount =
          await ExpenseRepository.getExpensesCountByType(type);
        const expensesListDto: ExpenseListDTO[] = expenses.map(
          (expense: Expense) => new ExpenseListDTO(expense),
        );
        const data = {
          expenses: expensesListDto,
          totalExpensesCount: expensesCount,
        };

        return new ControllerResponse(200, "", data);
      }
      const expenses: Expense[] = await ExpenseRepository.getExpensesValues(
        +offset,
        +limit,
      );
      const expensesCount = await ExpenseRepository.getExpensesCount();
      const expensesListDto: ExpenseListDTO[] = expenses.map(
        (expense: Expense) => new ExpenseListDTO(expense),
      );

      const data = {
        expenses: expensesListDto,
        totalExpensesCount: expensesCount,
      };
      return new ControllerResponse(200, "", data);
    } catch (error) {
      logger.error(`Failed to get expenses. Error in Service: ${error}`);
      return new ControllerResponse(
        500,
        "Echec de la récupération des demandes de frais",
      );
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
      return new ControllerResponse(200, "Demande de frais créé");
    } catch (error) {
      logger.error(`Failed to create expenses. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Echec de la création de la demande de frais",
      );
    }
  }

  public static async editExpenseDemand(req: Request, userId: number) {
    try {
      const targetExpense: Expense = await ExpenseRepository.getExpenseDemand(
        req.params.id,
      );
      if (targetExpense.id_owner != userId)
        return new ControllerResponse(403, "Accés refusé");

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
      return new ControllerResponse(
        200,
        "Modification de la demande n°" + req.params.id,
      );
    } catch (error) {
      logger.error(`Failed to update expenses. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Echec de la modification de la demande",
      );
    }
  }

  public static async confirmExpense(id: number, userId: number) {
    try {
      const expense_ = new ExpenseValidation(id, userId);
      const statusChange = await ExpenseRepository.confirmExpense(expense_);

      const expense = await ExpenseRepository.getExpenseDemand(String(id));

      const notification = new CreateNotification(
        "Votre demande de frais a été validée",
        NotificationType.EXPENSE,
        expense.id,
        expense.id_owner,
      );

      await NotificationRepository.createNotification(notification);
      const notificationCount =
        await NotificationRepository.getUntouchedNotificationsCountByUserId(
          expense.id_owner,
        );

      NotificationSender.send(notificationCount, expense.id_owner);

      return new ControllerResponse(200, "", statusChange);
    } catch (error) {
      logger.error(`Failed to edit the expense. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Echec de la validation de la demande de frais",
      );
    }
  }

  public static async rejectExpense(id: number, userId: number, req: Request) {
    try {
      const expense_ = new ExpenseInvalidation(
        id,
        req.body.justification,
        userId,
      );
      const statusChange = await ExpenseRepository.rejectExpense(expense_);

      const expense = await ExpenseRepository.getExpenseDemand(String(id));
      const notification = new CreateNotification(
        "Votre demande de frais a été rejetée",
        NotificationType.EXPENSE,
        expense.id,
        expense.id_owner,
      );

      await NotificationRepository.createNotification(notification);
      const notificationCount =
        await NotificationRepository.getUntouchedNotificationsCountByUserId(
          expense.id_owner,
        );

      NotificationSender.send(notificationCount, expense.id_owner);

      return new ControllerResponse(200, "", statusChange);
    } catch (error) {
      logger.error(`Failed to edit the expense. Error: ${error}`);
      return new ControllerResponse(500, "Echec du refus de la demande");
    }
  }

  public static async delExpenseDemand(id: string, userId: number) {
    try {
      const targetExpense: Expense =
        await ExpenseRepository.getExpenseDemand(id);
      if (targetExpense.id_owner != userId)
        return new ControllerResponse(403, "Access unauthorized");

      const result: any = await ExpenseRepository.delExpenseDemand(id);
      return new ControllerResponse(200, "La demande de frais a été supprimée");
    } catch (error) {
      logger.error(`Failed to delete expenses. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Echec de la suppression de la demande",
      );
    }
  }

  public static async getExpenseDemand(id: string) {
    try {
      const expenseTemp = await ExpenseRepository.getExpenseDemand(id);
      let expense: ExpenseListDTO;
      if (expenseTemp.file_key) {
        expense = new ExpenseListDTO(
          expenseTemp,
          await MinioClient.getSignedUrl(expenseTemp.file_key),
        );
      } else {
        expense = new ExpenseListDTO(expenseTemp);
      }

      return new ControllerResponse<ExpenseListDTO>(200, "", expense);
    } catch (error) {
      logger.error(`Failed to get expense. Error: ${error}`);
      return new ControllerResponse<ExpenseListDTO>(
        500,
        "Echec de la récupération de la demande",
      );
    }
  }

  public static async confirmExpenseDemand(req: Request, userId: number) {
    try {
      const status = req.body.ExpenseStatus;
      const expenseId = +req.params.id;
      await ExpenseRepository.confirmExpenseDemand(expenseId, status, userId);

      const expense = await ExpenseRepository.getExpenseDemand(
        String(expenseId),
      );

      const notification = new CreateNotification(
        "Une demande de frais attend votre validation",
        NotificationType.EXPENSE,
        expense.id,
      );

      await NotificationService.createNotificationsFromUserRoles(notification, [
        RoleEnum.HR,
        RoleEnum.ADMIN,
      ]);

      const notificationCount =
        await NotificationRepository.getUntouchedNotificationsCountByUserId(
          expense.id_owner,
        );

      NotificationSender.send(notificationCount, expense.id_owner);

      return new ControllerResponse(200, "La demande a été validée");
    } catch (error) {
      logger.error(`Failed to confirm expenses. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Echec de la validation de la demande",
      );
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
        "Echec de la récupération de la demande de frais",
      );
    }
  }

  public static async getExpensesAmountDateAndStatusByUserId(
    req: Request,
    userId: number,
  ) {
    try {
      const expenses: Expense[] =
        await ExpenseRepository.getExpensesAmountDateAndStatusByUserId(userId);

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
        "Echec de la récupération de la demande de frais",
      );
    }
  }

  public static async getExpensesAmountDateAndStatusByDate(req: Request) {
    try {
      const selectedDate =
        req.query.date?.toLocaleString() || new Date().toDateString();
      const monthName = new Date(selectedDate).toLocaleDateString("eng", {
        month: "long",
      });
      const year = new Date(selectedDate).getFullYear().toString();
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
        "Echec de la récupération de la demande de frais",
      );
    }
  }

  public static async getExpensesAmountDateAndStatusByUserIdAndDate(
    req: Request,
    userId: number,
  ) {
    try {
      const selectedDate: string =
        req.query.date?.toLocaleString() || new Date().toDateString();
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
        "Echec de la récupération de la demande de frais",
      );
    }
  }
}
