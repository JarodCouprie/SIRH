import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { verifyToken } from "./common/middleware/AuthMiddleware.js";
import auth from "./resources/auth/AuthController.js";
import users from "./resources/user/UserController.js";
import demand from "./resources/demand/DemandController.js";
import expense from "./resources/expense/ExpenseController.js";
import role from "./resources/role/RoleController.js";
import agency from "./resources/agency/AgencyController.js";
import department from "./resources/department/DepartmentController.js";
import team from "./resources/team/TeamController.js";
import userProfile from "./resources/userProfile/UserProfileController.js";
import notification from "./resources/notification/NotificationController.js";
import cors from "cors";
import helmet from "helmet";
import { Server } from "socket.io";
import { getIo, initSocket } from "./common/helper/Socket";
import { NotificationSender } from "./common/helper/NotificationSender";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

initSocket();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));
app.use(helmet());
app.disable("x-powered-by");
app.use("/api", auth);
app.use("/api/user", users);
app.use("/api/expense", expense);
app.use("/api/demand", demand);
app.use("/api/role", role);
app.use("/api/agency", agency);
app.use("/api/service", department);
app.use("/api/team", team);
app.use("/api/profile", userProfile);
app.use("/api/notification", notification);

app.get("/", verifyToken, (req: Request, res: Response) => {
  res.send("API SIRH");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`[server]: Serveur running at http://localhost:${port}`);
  });
}

export default app;
