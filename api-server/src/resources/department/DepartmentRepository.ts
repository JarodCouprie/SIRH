import { DatabaseClient } from "../../common/helper/DatabaseClient.js";
import { CreateDepartment, Department } from "../../common/model/Department.js";

export class DepartmentRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async getDepartmentByAgencyId(
    agencyId: number,
    limit = 10,
    offset = 0,
  ) {
    const [rows] = await this.pool.query(
      `SELECT service.*,
              users.firstname as lead_service_firstname,
              users.lastname  as lead_service_lastname,
              COUNT(team.id)  as team_count
       FROM service
                LEFT JOIN users ON service.id_user_lead_service = users.id
                LEFT JOIN team ON team.id_service = service.id
       WHERE service.id_agency = ?
       GROUP BY service.id
       ORDER BY service.label
       LIMIT ? OFFSET ?`,
      [agencyId, limit, offset],
    );
    return rows;
  }

  public static async getDepartmentByAgencyIdWithoutCount(agencyId: number) {
    const [rows] = await this.pool.query(
      `SELECT *
       FROM service
       WHERE id_agency = ?
       ORDER BY label `,
      [agencyId],
    );
    return rows;
  }

  public static async getDepartmentById(id: number) {
    const [rows]: any = await this.pool.query(
      `SELECT service.*, users.firstname as lead_service_firstname, users.lastname as lead_service_lastname
       FROM service
                LEFT JOIN users ON service.id_user_lead_service = users.id
       WHERE service.id = ?`,
      [id],
    );
    return rows[0];
  }

  public static async getCountByAgencyId(agencyId: number) {
    const [rows]: any = await this.pool.query(
      `SELECT COUNT(*) as count
       FROM service
       WHERE service.id_agency = ?`,
      [agencyId],
    );
    return rows[0].count;
  }

  public static async getCountUserInTeamService(id: number) {
    const [rows]: any = await this.pool.query(
      `SELECT COUNT(belong_team.id_user) AS team_count
       FROM team
                JOIN service ON team.id_service = service.id
                LEFT JOIN belong_team ON team.id = belong_team.id_team
       WHERE service.id = ?;`,
      [id],
    );
    return rows[0].team_count;
  }

  public static async createDepartment(department: CreateDepartment) {
    const [rows]: any = await this.pool.query(
      `
          INSERT INTO service (label,
                               minimum_users,
                               id_user_lead_service,
                               id_agency)
          VALUES (?, ?, ?, ?)
      `,
      [
        department.label,
        department.minimum_users,
        department.id_user_lead_service,
        department.id_agency,
      ],
    );
    return rows[0];
  }

  public static async deleteDepartment(idDepartment: number) {
    const [rows]: any = await this.pool.query(
      `DELETE
       FROM service
       WHERE id = ?`,
      [idDepartment],
    );
    return rows[0];
  }
}
