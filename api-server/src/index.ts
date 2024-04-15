import express, { Request, Response } from "express";
import dotenv from "dotenv";
import auth from "./controller/AuthController";
import users from "./controller/UserController";
import { verifyToken } from "./middleware/AuthMiddleware";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/api", auth);
app.use("/api/user", users);

app.get("/", verifyToken, (req: Request, res: Response) => {
  res.send("API SIRH");
});

app.listen(port, () => {
  console.log(`[server]: Serveur running at http://localhost:${port}`);
});
