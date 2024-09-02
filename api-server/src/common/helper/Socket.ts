import { Server } from "socket.io";
import { logger } from "./Logger";
import jwt from "jsonwebtoken";

let io: any;

export const userSockets: any = {};

export const initSocket = () => {
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  io = new Server(4000, {
    cors: corsOptions,
  });

  io.on("connection", (socket: any) => {
    const token = socket.handshake.query.token;
    const secret = process.env.ACCESS_TOKEN_SECRET ?? "secret";

    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        logger.error("Invalid JWT");
        return socket.disconnect();
      }

      const userId = decoded.userId;
      userSockets[userId] = socket;
    });
  });

  return io;
};

export const getIo = () => {
  if (!io) {
    logger.error("Socket.io not initialized");
  }
  return io;
};
