import * as Minio from "minio";
import { logger } from "./Logger.js";
import dotenv from "dotenv";

dotenv.config();

export class MinioClient {
  private static endPoint = process.env.MINIO_ENDPOINT!!;
  private static port = process.env.MINIO_PORT!!;
  private static region = process.env.MINIO_REGION!!;
  private static accessKey = process.env.MINIO_ACCESS_KEY!!;
  private static secretKey = process.env.MINIO_SECRET_KEY!!;
  private static bucket = process.env.MINIO_BUCKET!!;
  public static minioClient = new Minio.Client({
    endPoint: this.endPoint,
    port: +this.port,
    useSSL: false,
    region: this.region,
    accessKey: this.accessKey,
    secretKey: this.secretKey,
  });

  public static async getSignedUrl(key: string) {
    try {
      if (
        !this.endPoint ||
        !this.port ||
        !this.region ||
        !this.accessKey ||
        !this.secretKey ||
        !this.bucket
      ) {
        logger.error("Environments variable are missing");
        return;
      }
      return await this.minioClient.presignedGetObject(this.bucket, key, 86400);
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }

  public static async putObjectToBucket(
    key: string,
    file: Express.Multer.File,
  ) {
    try {
      if (
        !this.endPoint ||
        !this.port ||
        !this.region ||
        !this.accessKey ||
        !this.secretKey ||
        !this.bucket
      ) {
        logger.error("Environments variable are missing");
        return;
      }
      const metaData = {
        "Content-Type": file.mimetype,
      };

      await this.minioClient.putObject(
        this.bucket,
        key,
        file.buffer,
        file.size,
        metaData,
      );
    } catch (error) {
      logger.error(error);
    }
  }
}
