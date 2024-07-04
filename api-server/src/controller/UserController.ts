import dotenv from "dotenv";
import { verifyToken } from "../middleware/AuthMiddleware";
import { Request, Response, Router } from "express";
import { UserService } from "../service/UserService";
import {
  S3Client,
  ListBucketsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

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
  let key = "";
  getObject("sirhtest", "bahelmet.jpeg").then((file) => {
    res.status(200).json({ file: file });
  });
});

function getObject(Bucket: any, Key: any) {
  return new Promise(async (resolve, reject) => {
    const getObjectCommand = new GetObjectCommand({ Bucket, Key });

    try {
      // Set up AWS credentials
      const config = {
        region: "eu-west-3",
        endpoint: "http://localhost:9000",
        credentials: {
          accessKeyId: "E5JZBBsHqNPQj8SmKUA9",
          secretAccessKey: "1dN8S5Al09isKhgmbCMavaGoBKhFaBy3vtA07QMK",
        },
      };
      const client = new S3Client(config); // Pass in opts to S3 if necessary
      const response = await client.send(getObjectCommand);

      // Store all of data chunks returned from the response data stream
      // into an array then use Array#join() to use the returned contents as a String
      let responseDataChunks: any[] = [];

      // Handle an error while streaming the response body
      // @ts-ignore
      response.Body.once("error", (err) => reject(err));

      // Attach a 'data' listener to add the chunks of data to our array
      // Each chunk is a Buffer instance
      // @ts-ignore
      response.Body.on("data", (chunk) => responseDataChunks.push(chunk));

      // Once the stream has no more data, join the chunks into a string and return the string
      // @ts-ignore
      response.Body.once("end", () => resolve(responseDataChunks.join("")));
    } catch (err) {
      // Handle the error or throw
      return reject(err);
    }
  });
}

export default router;
