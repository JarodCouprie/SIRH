import dotenv from "dotenv";
import { verifyToken } from "../middleware/AuthMiddleware";
import { Request, Response, Router } from "express";
import { UserService } from "../service/UserService";
import * as Minio from "minio";

dotenv.config();
const router = Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await UserService.getUsers();
  res.status(code).json({ message, data });
});

router.get("/list", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await UserService.getUserList(req);
  res.status(code).json({ message, data });
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const { code, message, data } = await UserService.getUserById(+req.params.id);
  res.status(code).json({ message, data });
});

router.post("/", verifyToken, async (req: Request, res: Response) => {
  const { code, message } = await UserService.createUser(req);
  res.status(code).json(message);
});

router.post(
  "/set-role/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    const { code, message, data } = await UserService.setNewRole(
      req,
      +req.params.id,
    );
    res.status(code).json({ message, data });
  },
);

router.get("/file/get", async (req: Request, res: Response) => {
  const key = "PrimarisBloodAngelUpside.jpg";
  const url = await getObject("sirhtest", key);
  res.status(200).json({ url });
});

async function getObject(bucket: string, key: string) {
  try {
    const minioClient = new Minio.Client({
      endPoint: "localhost",
      port: 9000,
      useSSL: false,
      region: "eu-west-1",
      accessKey: "46hpfvFpZTHN4PYSgD16",
      secretKey: "GFkuV8r849YIGUTkBsXstsx6Bq5OV1bbTy3OQTSU",
    });

    const url = await minioClient.presignedGetObject(bucket, key, 86400);
    console.log(url);
    return url;
  } catch (e) {
    console.log(e);
  }
}

export default router;
