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
      `SELECT *
       FROM service
       WHERE id_agency = ?
       ORDER BY label
       LIMIT ? OFFSET ? `,
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
      `SELECT *
       FROM service
       WHERE id = ?`,
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
}
