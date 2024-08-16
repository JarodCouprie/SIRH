import { DatabaseClient } from "../../common/helper/DatabaseClient.js";
import { CreateTeam } from "../../common/model/Team.js";

export class TeamRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async getTeamByService(
    serviceId: number,
    limit = 10,
    offset = 0,
  ) {
    const [rows] = await this.pool.query(
      `SELECT team.*, service.label as service_label
       FROM team
                JOIN service ON team.id_service = service.id
       WHERE team.id_service = ?
       ORDER BY team.label
       LIMIT ? OFFSET ? `,
      [serviceId, limit, offset],
    );
    return rows;
  }

  public static async getCountByService(agencyId: number) {
    const [rows]: any = await this.pool.query(
      `SELECT COUNT(*) as count
       FROM team
                JOIN service ON team.id_service = service.id
       WHERE service.id_agency = ?`,
      [agencyId],
    );
    return rows[0].count;
  }

  public static async createTeam(team: CreateTeam) {
    const [result]: any = await this.pool.query(
      `
          INSERT INTO team (label,
                            minimum_users,
                            id_user_lead_team,
                            id_service)
          VALUES (?, ?, ?, ?)
      `,
      [team.label, team.minimum_users, team.id_user_lead_team, team.id_service],
    );
    return result;
  }

  public static async addMemberToTeam(member: {
    id_team: number;
    id_user: number;
  }) {
    const [result]: any = await this.pool.query(
      `
          INSERT INTO belong_team (id_team, id_user)
          VALUES (?, ?)
      `,
      [member.id_team, member.id_user],
    );

    return result;
  }
}
