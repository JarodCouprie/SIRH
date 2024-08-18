import { CreateAgency } from "../../common/model/Agency.js";
import { DatabaseClient } from "../../common/helper/DatabaseClient.js";

export class AgencyRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async getAgency(limit = 10, offset = 0) {
    const [rows] = await this.pool.query(
      `
          SELECT agency.id as id,
                 label,
                 street,
                 streetNumber,
                 locality,
                 zipcode,
                 lng,
                 lat
          FROM agency
                   LEFT JOIN address ON agency.id_address = address.id
          LIMIT ? OFFSET ?
      `,
      [limit, offset],
    );
    return rows;
  }

  public static async getAgencyEntityById(id: number) {
    const [rows]: any = await this.pool.query(
      `
          SELECT *
          FROM agency
          WHERE agency.id = ?
      `,
      [id],
    );
    return rows[0];
  }

  public static async getAgencyById(id: number) {
    const [rows]: any = await this.pool.query(
      `
          SELECT agency.id as id,
                 label,
                 street,
                 streetNumber,
                 locality,
                 zipcode
          FROM agency
                   LEFT JOIN address ON agency.id_address = address.id
          WHERE agency.id = ?
      `,
      [id],
    );
    return rows[0];
  }

  public static async getAgencyCoord() {
    const [rows] = await this.pool.query(
      `SELECT agency.*, address.*
       FROM agency
       LEFT JOIN address ON agency.id_address = address.id
       ORDER BY agency.label`,
    );
    return rows;
  }

  public static async getAgencyCount() {
    const [rows]: any = await this.pool.query(
      `SELECT COUNT(*) as count
       FROM agency`,
    );
    return rows[0].count;
  }

  public static async getDemandGroupedByMonth() {
    const [rows] = await this.pool.query(
      `SELECT DATE_FORMAT(created_at, '%Y-%m') AS date,
              COUNT(*)                         AS count
       FROM demand
       WHERE status = 'ACCEPTED'
       GROUP BY date
       ORDER BY date`,
    );
    return rows;
  }

  public static async createAgency(agency: CreateAgency) {
    const [rows]: any = await this.pool.query(
      `
          INSERT INTO agency (label,
                              id_address)
          VALUES (?, ?)
      `,
      [agency.label, agency.id_address],
    );
    return rows[0];
  }

  public static async deleteAgency(id: number) {
    const [rows]: any = await this.pool.query(
      `
          DELETE
          FROM agency
          WHERE id = ?;
      `,
      [id],
    );
    return rows[0];
  }
}
