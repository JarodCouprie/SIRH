import { logger } from "../../common/helper/Logger.js";
import { ControllerResponse } from "../../common/helper/ControllerResponse.js";
import { UserRepository } from "../user/UserRepository.js";
import { NotificationRepository } from "./NotificationRepository.js";
import { Notification } from "../../common/model/Notification.js";
import { NotificationDTO } from "./dto/NotificationDTO.js";

export class NotificationService {
  public static async getNotificationsByUserId(userId: number) {
    try {
      const user: any = await UserRepository.getUserById(userId);
      if (!user) {
        return new ControllerResponse(401, "L'utilisateur n'a pas été trouvé");
      }

      const notifications: any =
        await NotificationRepository.getNotificationsByUserId(userId);

      const notificationsMapped: NotificationDTO[] = notifications?.map(
        (notification: Notification) => {
          return new NotificationDTO(notification);
        },
      );

      const totalData =
        await NotificationRepository.getNotificationsByUserId(userId);

      return new ControllerResponse(200, "", {
        list: notificationsMapped,
        totalData,
      });
    } catch (error) {
      logger.error(
        `Failed to get notification for user n°${userId}. Error: ${error}`,
      );
      return new ControllerResponse(
        500,
        "Impossible de récupérer les notifications de l'utilisateur",
      );
    }
  }
}
