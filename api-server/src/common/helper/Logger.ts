import winston from "winston";

export const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
