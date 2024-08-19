import { NotificationType } from "../../../common/enum/NotificationType.js";
import { Notification } from "../../../common/model/Notification.js";

export class NotificationDTO {
  id: number;
  description: string;
  type: NotificationType;
  id_sender: number;
  touched: boolean;
  created_at: Date;

  constructor(notification: Notification) {
    this.id = notification.id;
    this.description = notification.description;
    this.type = notification.type;
    this.id_sender = notification.id_sender;
    this.touched = notification.touched;
    this.created_at = new Date(`${notification.created_at} UTC`);
  }
}
