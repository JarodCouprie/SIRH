import { DatabaseClient } from "../helper/DatabaseClient.js";
import { EditDemandDTO } from "../dto/demand/EditDemandDTO.js";
import { CreateDemand } from "../dto/demand/CreateDemandDTO.js";
import {
  ConfirmDemand,
  DemandStatus,
  RejectDemand,
  StatusDemand,
} from "../model/Demand.js";

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
       WHERE id_owner = ?
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

  public static async geCountByUserId(userId: number) {
    const [rows]: any = await this.pool.query(
      `SELECT COUNT(*) as count
       FROM demand
       WHERE demand.id_owner = ?`,
      [userId],
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
              end_date   = ?,
              motivation = ?,
              type       = ?,
              status     = ?,
              number_day = ?,
              file_key   = ?
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
        demand.key,
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
                              id_owner)
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

  static async confirmDemand(demand: ConfirmDemand) {
    const [rows]: any = await this.pool.query(
      `
          UPDATE demand
          SET status       = ?,
              id_validator = ?
          WHERE id = ?
      `,
      [demand.status, demand.validatorId, demand.id],
    );
    return rows[0];
  }

  static async rejectDemand(demand: RejectDemand) {
    const [rows]: any = await this.pool.query(
      `
          UPDATE demand
          SET status        = ?,
              justification = ?,
              id_validator  = ?
          WHERE id = ?
      `,
      [demand.status, demand.justification, demand.validatorId, demand.id],
    );
    return rows[0];
  }

  static async getValidatedDemands(
    userId: number,
    limit: number,
    offset: number,
  ) {
    const [rows]: any = await this.pool.query(
      `
          SELECT demand.*, users.firstname as firstname_validator, users.lastname as lastname_validator
          FROM demand
                   LEFT JOIN users ON demand.id_validator = users.id
          WHERE demand.id_owner = ?
          ORDER BY demand.created_at DESC
          LIMIT ? OFFSET ?;
      `,
      [userId, limit, offset],
    );
    return rows;
  }
}
