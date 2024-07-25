import { DatabaseClient } from "../helper/DatabaseClient";
import { Demand, StatusDemand } from "../model/Demand";
import { CreateDemand } from "../dto/demand/CreateDemandDTO";
import { EditDemandDTO } from "../dto/demand/EditDemandDTO";

export class DemandRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async getDemandWithType(limit = 10, offset = 0, type = "CA") {
    const [rows] = await this.pool.query(
      `SELECT *
       FROM demand
       WHERE type = ?
       ORDER BY created_at
       LIMIT ? OFFSET ? `,
      [type, limit, offset],
    );
    return rows;
  }

  public static async getDemand(limit = 10, offset = 0) {
    const [rows] = await this.pool.query(
      `SELECT *
       FROM demand
       ORDER BY created_at
       LIMIT ? OFFSET ? `,
      [limit, offset],
    );
    return rows;
  }
  public static async getDemandByUser(userId: number, limit = 10, offset = 0) {
    const [rows] = await this.pool.query(
      `SELECT *
       FROM demand
       WHERE id_user_create_demand = ?
       ORDER BY created_at
       LIMIT ? OFFSET ? `,
      [userId, limit, offset],
    );
    return rows;
  }

  public static async getDemandCountWithType(type = "CA") {
    const [rows]: any = await this.pool.query(
      `SELECT COUNT(*) as count
       FROM demand
       WHERE type = ?`,
      [type],
    );
    return rows[0].count;
  }

  public static async getDemandCount() {
    const [rows]: any = await this.pool.query(
      `SELECT COUNT(*) as count
       FROM demand`,
    );
    return rows[0].count;
  }

  public static async getDemandById(id: number) {
    const [rows]: any = await this.pool.query(
      `
          SELECT *
          FROM demand
          WHERE id = ?
      `,
      [id],
    );
    return rows[0];
  }

  public static async editDemand(id: number, demand: EditDemandDTO) {
    const [rows]: any = await this.pool.query(
      `
          UPDATE demand
          SET start_date=?,
              end_date    = ?,
              motivation = ?,
              type       = ?,
              status     = ?,
              number_day = ?
          WHERE id = ?
          LIMIT 1;

      `,
      [
        demand.start_date,
        demand.end_date,
        demand.motivation,
        demand.type,
        demand.status,
        demand.number_day,
        id,
      ],
    );
    return rows[0];
  }

  public static async deleteDemand(id: number) {
    const [rows]: any = await this.pool.query(
      `
          DELETE
          FROM demand
          WHERE id = ?;
      `,
      [id],
    );
    return rows[0];
  }

  public static async createDemand(demand: CreateDemand) {
    const [rows]: any = await this.pool.query(
      `
          INSERT INTO demand (start_date,
                              end_date,
                              motivation,
                              status,
                              type,
                              number_day,
                              file_key,
                              id_user_create_demand)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        demand.start_date,
        demand.end_date,
        demand.motivation,
        demand.status,
        demand.type,
        demand.number_day,
        demand.file_key,
        demand.idOwner,
      ],
    );
    return rows[0];
  }

  static async editStatusDemand(demand: StatusDemand) {
    const [rows]: any = await this.pool.query(
      `
          UPDATE demand
          SET status = ?
          WHERE id = ?
      `,
      [demand.status, demand.id],
    );
    return rows[0];
  }
}
