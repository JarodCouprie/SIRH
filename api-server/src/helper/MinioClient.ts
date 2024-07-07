import * as Minio from "minio";
import { logger } from "./Logger.js";
import dotenv from "dotenv";

dotenv.config();

export class MinioClient {
  public static async getSignedUrl(bucket: string, key: string) {
    try {
      const endPoint = process.env.MINIO_ENDPOINT;
      const port = process.env.MINIO_PORT;
      const region = process.env.MINIO_REGION;
      const accessKey = process.env.MINIO_ACCESS_KEY;
      const secretKey = process.env.MINIO_SECRET_KEY;
      if (!endPoint || !port || !region || !accessKey || !secretKey) {
        logger.error("Environments variable are missing");
        return;
      }
      const minioClient = new Minio.Client({
        endPoint: endPoint,
        port: +port,
        useSSL: false,
        region: region,
        accessKey: accessKey,
        secretKey: secretKey,
      });
      return await minioClient.presignedGetObject(bucket, key, 86400);
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }
}
