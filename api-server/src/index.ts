import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { verifyToken } from "./middleware/AuthMiddleware.js";
import auth from "./controller/AuthController.js";
import users from "./controller/UserController.js";
import demand from "./controller/DemandController.js";
import expense from "./controller/ExpenseController.js";
import role from "./controller/RoleController.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));
app.use("/api", auth);
app.use("/api/user", users);
app.use("/api/expense", expense);
app.use("/api/demand", demand);
app.use("/api/role", role);

app.get("/", verifyToken, (req: Request, res: Response) => {
  res.send("API SIRH");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`[server]: Serveur running at http://localhost:${port}`);
  });
}

export default app;
