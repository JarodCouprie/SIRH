import { DatabaseClient } from "../../common/helper/DatabaseClient.js";

export class TeamRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async getTeamByAgencyId(
    agencyId: number,
    limit = 10,
    offset = 0,
  ) {
    const [rows] = await this.pool.query(
      `SELECT team.*, service.label as service_label
       FROM team
                JOIN service ON team.id_service = service.id
       WHERE service.id_agency = ?
       ORDER BY team.label
       LIMIT ? OFFSET ? `,
      [agencyId, limit, offset],
    );
    return rows;
  }

  public static async getCountByAgencyId(agencyId: number) {
    const [rows]: any = await this.pool.query(
      `SELECT COUNT(*) as count
       FROM team
                JOIN service ON team.id_service = service.id
       WHERE service.id_agency = ?`,
      [agencyId],
    );
    return rows[0].count;
  }
}
