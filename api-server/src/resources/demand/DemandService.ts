import { ControllerResponse } from "../../common/helper/ControllerResponse.js";
import { DemandRepository } from "./DemandRepository.js";
import {
  ConfirmDemand,
  Demand,
  RejectDemand,
  StatusDemand,
  ValidatedDemand,
} from "../../common/model/Demand.js";
import { logger } from "../../common/helper/Logger.js";
import { DemandDTO } from "./dto/DemandDTO.js";
import { CreateDemand } from "./dto/CreateDemandDTO.js";
import { EditDemandDTO } from "./dto/EditDemandDTO.js";
import { Request } from "express";
import { UserService } from "../user/UserService.js";
import { MinioClient } from "../../common/helper/MinioClient.js";
import { UserRepository } from "../user/UserRepository.js";
import { DemandValidatedDTO } from "./dto/DemandValidatedDTO.js";
import { User } from "../../common/model/User.js";
import { DemandEntity } from "../../common/entity/demand/demand.entity.js";
import { DemandType } from "../../common/enum/DemandType";
import { DemandStatus } from "../../common/enum/DemandStatus";
import { ExpenseRepository } from "../expense/ExpenseRepository";
import { CreateNotification } from "../../common/model/Notification";
import { NotificationType } from "../../common/enum/NotificationType";
import { NotificationRepository } from "../notification/NotificationRepository";
import { NotificationSender } from "../../common/helper/NotificationSender";
import { NotificationService } from "../notification/NotificationService";
import { RoleEnum } from "../../common/enum/RoleEnum";

export function calculateNumberOfDays(
  start_date: Date,
  end_date: Date,
): number {
  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const start = new Date(start_date);
  const end = new Date(end_date);
  let count = 0;
  let currentDate = start;

  if (start.getTime() === end.getTime()) {
    return isWeekend(start) ? 0 : 1;
  }

  if (isWeekend(start) && isWeekend(end)) {
    return -1;
  }

  while (currentDate <= end) {
    if (!isWeekend(currentDate)) {
      count++;
    }
    currentDate = new Date(currentDate.getTime() + ONE_DAY_IN_MS);
  }

  return count;
}

export function updateUserDays(
  user: any,
  type: DemandType,
  numberOfDays: number,
  isAddingDays: boolean = false,
) {
  switch (type) {
    case DemandType.RTT:
      if (isAddingDays) {
        user.rtt += numberOfDays;
      } else {
        if (user.rtt < numberOfDays) {
          return "Pas assez de jour de RTT";
        }
        user.rtt -= numberOfDays;
      }
      break;
    case DemandType.CA:
      if (isAddingDays) {
        user.ca += numberOfDays;
      } else {
        if (user.ca < numberOfDays) {
          return "Pas assez de jour de Congé";
        }
        user.ca -= numberOfDays;
      }
      break;
    case DemandType.TT:
      if (isAddingDays) {
        user.tt += numberOfDays;
      } else {
        if (user.tt < numberOfDays) {
          return "Pas assez de jour de Télétravail";
        }
        user.tt -= numberOfDays;
      }
      break;
  }
  return null;
}

export class DemandService {
  public static async getDemand(userId: number, req: Request, type: string) {
    try {
      const pageSize = req.query.pageSize || "0";
      const pageNumber = req.query.pageNumber || "10";
      const limit = +pageSize;
      const offset = (+pageNumber - 1) * +pageSize;
      let demandCount = await DemandRepository.getDemandCountWithType(type);

      let demands: any = await DemandRepository.getDemandWithType(
        limit,
        offset,
        type,
      );
      if (type === "All") {
        demands = await DemandRepository.getDemandByUser(userId, limit, offset);
        demandCount = await DemandRepository.geCountByUserId(userId);
      }
      const demandDto: DemandDTO[] = demands.map(
        (demand: Demand) => new DemandDTO(demand),
      );
      return new ControllerResponse(200, "", {
        totalData: demandCount,
        list: demandDto,
      });
    } catch (error) {
      logger.error(`Failed to get demand. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get demand");
    }
  }

  public static async getDemandById(id: string) {
    try {
      const demand_: any = await DemandRepository.getDemandById(+id);
      const signedUrl = await MinioClient.getSignedUrl(demand_.file_key);
      const demand: DemandDTO = new DemandDTO(demand_, signedUrl);

      if (!demand) {
        return new ControllerResponse(401, "Demand doesn't exist");
      }

      return new ControllerResponse<DemandDTO>(200, "", demand);
    } catch (error) {
      logger.error(`Failed to get the demand. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get the demand");
    }
  }

  public static async changeStatusDemand(id: string, userId: number) {
    try {
      const demand: any = await DemandRepository.getDemandById(+id);
      if (demand.id_owner !== userId) {
        return new ControllerResponse(
          401,
          "Vous n'êtes pas autorisé à modifier cette demande",
        );
      }
      const demand_: StatusDemand = {
        id: +id,
        status: DemandStatus.WAITING,
      };
      const statusChange = await DemandRepository.editStatusDemand(demand_);

      const updatedDemand = await DemandRepository.getDemandById(+id);

      const notification = new CreateNotification(
        "Une demande attend votre validation",
        NotificationType.DEMAND,
        updatedDemand.id,
      );

      await NotificationService.createNotificationsFromUserRoles(notification, [
        RoleEnum.HR,
        RoleEnum.ADMIN,
        RoleEnum.LEAVE_MANAGER,
      ]);

      const notificationCount =
        await NotificationRepository.getUntouchedNotificationsCountByUserId(
          updatedDemand.id_owner,
        );

      NotificationSender.send(notificationCount, updatedDemand.id_owner);

      return new ControllerResponse(200, "", statusChange);
    } catch (error) {
      logger.error(`Failed to edit the demand. Error: ${error}`);
      return new ControllerResponse(500, "Failed to edit the demand");
    }
  }

  public static async editDemand(
    idDemand: string,
    req: Request,
    userId: number,
  ) {
    try {
      const demand: any = await DemandRepository.getDemandById(+idDemand);
      if (demand.id_owner !== userId) {
        return new ControllerResponse(
          401,
          "Vous n'êtes pas autorisé à modifier cette demande",
        );
      }
      const body = JSON.parse(req.body.body);
      if (demand.status !== DemandStatus.DRAFT) {
        return new ControllerResponse(400, "Not allowed");
      }

      let number_day = 0;

      if (body.start_date && body.end_date) {
        number_day = calculateNumberOfDays(body.start_date, body.end_date);
        if (number_day === -1) {
          return new ControllerResponse(
            400,
            "Il est impossibe de selectionner un jour du week end",
          );
        }
      }

      const userResponse: any = await UserService.getUserById(userId);
      if (userResponse.code !== 200) {
        return new ControllerResponse(404, "User not found");
      }

      const user = userResponse.data;

      if (!demand) {
        return new ControllerResponse(401, "Demand doesn't exist");
      }

      const originalEndDate = demand.end_date;
      const originalNumberOfDays = calculateNumberOfDays(
        demand.start_date,
        originalEndDate,
      );
      const isReducingDays =
        new Date(body.end_date) < new Date(originalEndDate);

      if (isReducingDays) {
        const daysToRecover = originalNumberOfDays - number_day;
        updateUserDays(user, body.type, daysToRecover, true);
      } else {
        const daysToLose = number_day - originalNumberOfDays;
        const error = updateUserDays(user, body.type, daysToLose);
        if (error) {
          return new ControllerResponse(400, error);
        }
      }

      let key: string | undefined;
      if (req.file) {
        const file = req.file;
        key = `user/${userId}/demand/${file.originalname}`;
        await MinioClient.putObjectToBucket(key, file);
        demand.file_key = key;
      }

      const editDemand = new EditDemandDTO(
        body.start_date,
        body.end_date,
        body.motivation,
        body.type,
        number_day,
        key || "",
        body.status,
      );
      await DemandRepository.editDemand(+idDemand, editDemand);
      await UserService.updateUserDays(userId, user.rtt, user.ca, user.tt);

      return new ControllerResponse(200, "", editDemand);
    } catch (error) {
      logger.error(`Failed to edit the demand. Error: ${error}`);
      return new ControllerResponse(500, "Failed to edit the demand");
    }
  }

  public static async deleteDemand(id: string, userId: number) {
    try {
      const demand: any = await DemandRepository.getDemandById(+id);

      if (!demand) {
        return new ControllerResponse(404, "pas de demande");
      }

      const userResponse: any = await UserService.getUserById(userId);
      const user = userResponse.data;

      updateUserDays(user, demand.type, demand.number_day, true);
      await DemandRepository.deleteDemand(+id);
      await UserService.updateUserDays(userId, user.rtt, user.ca, user.tt);
      return new ControllerResponse(200, "");
    } catch (error) {
      logger.error(`Failed to delete the demand. Error: ${error}`);
      return new ControllerResponse(500, "Failed to delete the demand");
    }
  }

  public static async createDemand(req: Request, id: number) {
    try {
      let number_day = 0;
      const body = JSON.parse(req.body.body);
      if (body.start_date && body.end_date) {
        number_day = calculateNumberOfDays(body.start_date, body.end_date);
        if (number_day === -1) {
          return new ControllerResponse(
            400,
            "Il est impossible de sélectionner un jour du week end",
          );
        }
      }

      const userResponse: any = await UserService.getUserById(id);
      if (userResponse.code !== 200) {
        return new ControllerResponse(404, "User not found");
      }

      const user = userResponse.data;

      const error = updateUserDays(user, body.type, number_day);
      if (error) {
        return new ControllerResponse(400, error);
      }

      let key: string | undefined;
      if (req.file) {
        const file = req.file;
        key = `user/${id}/demand/${file.originalname}`;
        await MinioClient.putObjectToBucket(key, file);
      }

      const newDemand = new CreateDemand(
        body.start_date,
        body.end_date,
        body.motivation,
        DemandStatus.DRAFT,
        body.type,
        number_day,
        key || "",
        id,
      );

      await UserService.updateUserDays(id, user.rtt, user.ca, user.tt);
      const demand: any = await DemandRepository.createDemand(newDemand);
      return new ControllerResponse(201, "", demand);
    } catch (error) {
      return new ControllerResponse(500, "Impossible de créer la demande");
    }
  }

  public static async getValidatedDemand(req: Request, userId: number) {
    try {
      const pageSize = req.query.pageSize || "0";
      const pageNumber = req.query.pageNumber || "10";
      const limit = +pageSize;
      const offset = (+pageNumber - 1) * +pageSize;

      const demands: ValidatedDemand[] =
        await DemandRepository.getValidatedDemands(userId, limit, offset);

      const demandsCount: number =
        await DemandRepository.geCountByUserId(userId);

      const demandListDto = demands?.map(
        (demand) => new DemandValidatedDTO(demand),
      );

      return new ControllerResponse(200, "", {
        totalData: demandsCount,
        list: demandListDto,
      });
    } catch (error) {
      logger.error(`Get demands failed. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de récupérer les demandes",
      );
    }
  }

  public static async confirmDemand(id: number, userId: number) {
    try {
      const demand = new ConfirmDemand(id, userId);
      await DemandRepository.confirmDemand(demand);

      const updatedDemand = await DemandRepository.getDemandById(id);
      const notification = new CreateNotification(
        "Votre demande a été validée",
        NotificationType.DEMAND,
        updatedDemand.id,
        updatedDemand.id_owner,
      );

      await NotificationRepository.createNotification(notification);
      const notificationCount =
        await NotificationRepository.getUntouchedNotificationsCountByUserId(
          updatedDemand.id_owner,
        );

      NotificationSender.send(notificationCount, updatedDemand.id_owner);

      return new ControllerResponse(200, "Demande acceptée avec succès");
    } catch (error) {
      logger.error(`Failed to confirm demand. Error: ${error}`);
      return new ControllerResponse(500, "Validation de la demande impossible");
    }
  }

  public static async rejectDemand(
    id: number,
    userId: number,
    justification: string,
  ) {
    try {
      const user: User = await UserRepository.getUserById(userId);
      if (!user) {
        return new ControllerResponse(401, "L'utilisateur n'a pas été trouvé");
      }
      const demand: DemandEntity = await DemandRepository.getDemandById(id);
      if (!demand) {
        return new ControllerResponse(401, "La demande n'a pas été trouvée");
      }

      const rejectedDemand = new RejectDemand(
        demand.id,
        user.id,
        justification,
      );
      await DemandRepository.rejectDemand(rejectedDemand);

      switch (demand.type) {
        case DemandType.CA:
          user.ca += demand.number_day;
          break;
        case DemandType.RTT:
          user.rtt += demand.number_day;
          break;
        case DemandType.TT:
          user.tt += demand.number_day;
          break;
      }

      await UserRepository.updateUserDays(user.id, user.rtt, user.ca, user.tt);

      const updatedDemand = await DemandRepository.getDemandById(id);
      const notification = new CreateNotification(
        "Votre demande a été rejetée",
        NotificationType.DEMAND,
        updatedDemand.id,
        updatedDemand.id_owner,
      );

      await NotificationRepository.createNotification(notification);
      const notificationCount =
        await NotificationRepository.getUntouchedNotificationsCountByUserId(
          updatedDemand.id_owner,
        );

      NotificationSender.send(notificationCount, updatedDemand.id_owner);

      return new ControllerResponse(200, "Demande rejetée avec succès");
    } catch (error) {
      logger.error(`Failed to reject demand. Error: ${error}`);
      return new ControllerResponse(500, "Refus de la demande impossible");
    }
  }
}
