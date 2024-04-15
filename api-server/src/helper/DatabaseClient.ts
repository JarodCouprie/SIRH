import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

export class DatabaseClient {
  public static mysqlPool = mysql
    .createPool({
      host: process.env.MYSQL_HOST, // container name for production
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_USER_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    })
    .promise();

  public static mysqlConnection = mysql
    .createConnection({
      host: process.env.MYSQL_HOST, // container name for production
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_USER_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    })
    .promise();
}
