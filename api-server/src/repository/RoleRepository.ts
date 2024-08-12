import { DatabaseClient } from "../helper/DatabaseClient.js";

export class RoleRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async getRoles() {
    const [rows] = await this.pool.query(`
        SELECT *
        FROM role
    `);
    return rows;
  }
}
