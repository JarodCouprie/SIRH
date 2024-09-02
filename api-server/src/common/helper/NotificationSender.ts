import { getIo, userSockets } from "./Socket";

export class NotificationSender {
  static send = (data: any, userId: number) => {
    const socket = userSockets[userId];
    if (socket) {
      socket.emit("notification", { data });
    }
  };
}
