import { Server } from "socket.io";
import { logger } from "./Logger";

let io: any;

export const initSocket = () => {
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  io = new Server(4000, {
    cors: corsOptions,
  });

  return io;
};

export const getIo = () => {
  if (!io) {
    logger.error("Socket.io not initialized");
  }
  return io;
};
