import { DatabaseClient } from "../../common/helper/DatabaseClient.js";
import { CreateNotification } from "../../common/model/Notification.js";

export class NotificationRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async getNotificationsByUserId(
    userId: number,
    limit = 10,
    offset = 0,
  ) {
    const [rows] = await this.pool.query(
      "SELECT * FROM notification WHERE id_receiver = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [userId, limit, offset],
    );
    return rows;
  }

  public static async getNotificationsCountByUserId(userId: number) {
    const [rows]: any = await this.pool.query(
      "SELECT COUNT(*) as count FROM notification WHERE notification.id_receiver = ?",
      [userId],
    );
    return rows[0].count;
  }

  public static async createNotification(notification: CreateNotification) {
    const [result] = await this.pool.query(
      `
          INSERT INTO notification (description,
                                    type,
                                    id_receiver,
                                    id_sender)
          VALUES (?, ?, ?, ?)
      `,
      [
        notification.description,
        notification.type,
        notification.id_receiver,
        notification.id_sender,
      ],
    );
    return result;
  }

  public static async markNotificationAsTouched(notificationId: number) {
    const [result] = await this.pool.query(
      `UPDATE notification
       SET touched = true
       WHERE id = ?`,
      [notificationId],
    );
    return result;
  }
}
