import { getIo } from "./Socket";

export class NotificationSender {
  static send = (data: any) => {
    const io = getIo();
    io.emit("notification", { data });
  };
}
