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
      `SELECT team.*,
              service.label as service_label,
              users.firstname as lead_team_firstname,
              users.lastname as lead_team_lastname
       FROM team
                JOIN service ON team.id_service = service.id
                LEFT JOIN users ON team.id_user_lead_team = users.id
       WHERE team.id_service = ?
       ORDER BY team.label
       LIMIT ? OFFSET ? `,
      [serviceId, limit, offset],
    );
    return rows;
  }

  public static async getTeamById(teamId: number) {
    const [rows] = await this.pool.query(
      `SELECT team.* , users.firstname as lead_team_firstname, users.lastname as lead_team_lastname
       FROM team
                JOIN service ON team.id_service = service.id
                LEFT JOIN users ON team.id_user_lead_team = users.id
       WHERE team.id = ?`,
      [teamId],
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

  public static async countTeam(idService: number) {
    const [result]: any = await this.pool.query(
      `
          SELECT belong_team.id_team,
                 COUNT(belong_team.id_user)                    AS total_team,
                 COUNT(CASE WHEN demand.id IS NULL THEN 1 END) AS total_present
          FROM belong_team
                   JOIN
               team ON belong_team.id_team = team.id
                   JOIN
               users ON belong_team.id_user = users.id
                   LEFT JOIN
               demand ON users.id = demand.id_owner
                   AND demand.status = 'ACCEPTED'
                   AND CURDATE() BETWEEN demand.start_date AND demand.end_date
          WHERE team.id_service = ?
          GROUP BY team.id;
      `,
      [idService],
    );
    return result;
  }
  public static async countTeamById(idTeam: number) {
    const [result]: any = await this.pool.query(
      `
          SELECT belong_team.id_team,
                 COUNT(belong_team.id_user)                    AS total_team,
                 COUNT(CASE WHEN demand.id IS NULL THEN 1 END) AS total_present
          FROM belong_team
                   JOIN
               team ON belong_team.id_team = team.id
                   JOIN
               users ON belong_team.id_user = users.id
                   LEFT JOIN
               demand ON users.id = demand.id_owner
                   AND demand.status = 'ACCEPTED'
                   AND CURDATE() BETWEEN demand.start_date AND demand.end_date
          WHERE team.id = ?;
      `,
      [idTeam],
    );
    return result;
  }
}
