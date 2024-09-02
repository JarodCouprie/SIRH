import { logger } from "../../common/helper/Logger.js";
import { ControllerResponse } from "../../common/helper/ControllerResponse.js";
import { UserRepository } from "../user/UserRepository.js";
import { NotificationRepository } from "./NotificationRepository.js";
import {
  CreateNotification,
  Notification,
} from "../../common/model/Notification.js";
import { NotificationDTO } from "./dto/NotificationDTO.js";
import { RoleEnum } from "../../common/enum/RoleEnum.js";
import { Request } from "express";
import { CustomRequest } from "../../common/helper/CustomRequest.js";
import { UserEntity } from "../../common/entity/user/user.entity";
import { NotificationSender } from "../../common/helper/NotificationSender";
import { initSocket } from "../../common/helper/Socket";

export class NotificationService {
  public static async getNotificationsByUserId(req: Request) {
    try {
      const pageSize = req.query.pageSize || "0";
      const pageNumber = req.query.pageNumber || "10";
      const isPageSizeAnInteger = Number.isInteger(+pageSize);
      const isPageNumberAnInteger = Number.isInteger(+pageNumber);
      if (!isPageSizeAnInteger && !isPageNumberAnInteger) {
        return new ControllerResponse(400, "Les paramètres sont incorrects");
      }

      const userId = (req as CustomRequest).token.userId;
      const user: any = await UserRepository.getUserById(userId);
      if (!user) {
        return new ControllerResponse(401, "L'utilisateur n'a pas été trouvé");
      }

      const limit = +pageSize;
      const offset = (+pageNumber - 1) * +pageSize;
      const notifications: any =
        await NotificationRepository.getNotificationsByUserId(
          user.id,
          limit,
          offset,
        );

      const notificationsMapped: NotificationDTO[] = notifications?.map(
        (notification: Notification) => {
          return new NotificationDTO(notification);
        },
      );

      const totalData =
        await NotificationRepository.getNotificationsCountByUserId(userId);

      return new ControllerResponse(200, "", {
        list: notificationsMapped,
        totalData,
      });
    } catch (error) {
      logger.error(`Failed to get notification}. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de récupérer les notifications de l'utilisateur",
      );
    }
  }

  public static async createNotificationsFromUserRoles(
    notification: CreateNotification,
    roles: RoleEnum[],
  ) {
    try {
      const users: UserEntity[] = await UserRepository.getUsersByRoles(roles);
      if (!users || users.length === 0) {
        return logger.error("No user found");
      }
      users.map(async (user) => {
        const createNotification = new CreateNotification(
          notification.description,
          notification.type,
          notification.id_sender,
          user.id,
        );
        await NotificationRepository.createNotification(createNotification);
      });
    } catch (error) {
      logger.error(`Failed to generate notifications. Error: ${error}`);
    }
  }
}
