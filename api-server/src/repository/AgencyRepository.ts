import { CreateAgency } from "../model/Organisation.js";
import { DatabaseClient } from "../helper/DatabaseClient.js";

export class AgencyRepository {
  private static pool = DatabaseClient.mysqlPool;

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
}
