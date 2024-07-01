import { DatabaseClient } from "../helper/DatabaseClient";
import { Demand } from "../model/Demand";
import { CreateDemand } from "../dto/demand/CreateDemandDTO";
import { EditDemandDTO } from "../dto/demand/EditDemandDTO";

export class DemandRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async getDemandWithType(limit = 10, offset = 0, type = "CA") {
    const [rows] = await this.pool.query(
      `SELECT *
       FROM demand
       WHERE type = ?
       ORDER BY createdAt
       LIMIT ? OFFSET ? `,
      [type, limit, offset],
    );
    return rows;
  }

  public static async getDemand(limit = 10, offset = 0) {
    const [rows] = await this.pool.query(
      `SELECT *
       FROM demand
       ORDER BY createdAt
       LIMIT ? OFFSET ? `,
      [limit, offset],
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
          SET startDate=?,
              endDate    = ?,
              motivation = ?,
              type       = ?,
              status     = ?
          WHERE id = ?
          LIMIT 1;

      `,
      [
        demand.startDate,
        demand.endDate,
        demand.motivation,
        demand.type,
        demand.status,
        id,
      ],
    );
    return rows[0];
  }

  public static async deleteDemand(id: number) {
    console.log(id);
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
          INSERT INTO demand (startDate,
                              endDate,
                              motivation,
                              status,
                              type,
                              number_day,
                              id_user_create_demand)
          VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        demand.startDate,
        demand.endDate,
        demand.motivation,
        demand.status,
        demand.type,
        demand.number_day,
        demand.idOwner,
      ],
    );
    return rows[0];
  }
}
