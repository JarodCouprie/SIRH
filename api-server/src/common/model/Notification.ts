import { NotificationType } from "../enum/NotificationType.js";

export class Notification {
  id: number;
  description: string;
  type: NotificationType;
  id_receiver: number;
  id_sender: number;
  touched: boolean;
  created_at: Date;

  constructor(
    id: number,
    description: string,
    type: NotificationType,
    id_receiver: number,
    id_sender: number,
    touched: boolean,
    created_at: Date,
  ) {
    this.id = id;
    this.description = description;
    this.type = type;
    this.id_receiver = id_receiver;
    this.id_sender = id_sender;
    this.touched = touched;
    this.created_at = created_at;
  }
}

export class CreateNotification {
  description: string;
  type: NotificationType;
  id_sender: number;
  id_receiver?: number;

  constructor(
    description: string,
    type: NotificationType,
    id_sender: number,
    id_receiver?: number,
  ) {
    this.description = description;
    this.type = type;
    this.id_receiver = id_receiver;
    this.id_sender = id_sender;
  }
}
