import { CreateUser, ResetUserPassword } from "../model/User";
import { DatabaseClient } from "../helper/DatabaseClient";

export class UserRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async getUsers() {
    const [rows] = await this.pool.query("SELECT * FROM users");
    return rows;
  }

  public static async getUsersCount() {
    const [rows]: any = await this.pool.query(
      `
          SELECT COUNT(*) as count
          FROM users
      `,
    );
    return rows[0].count;
  }

  public static async listUsers(limit = 10, offset = 0) {
    const [rows] = await this.pool.query(
      `
          SELECT *
          FROM users
          ORDER BY firstname
          LIMIT ? OFFSET ?
      `,
      [limit, offset],
    );
    return rows;
  }

  public static async getUserById(id: number) {
    const [rows]: any = await this.pool.query(
      `
          SELECT *
          FROM users
          WHERE id = ?
      `,
      [id],
    );
    return rows[0];
  }

  public static async getUserByEmail(email: string) {
    const [rows]: any = await this.pool.query(
      `
          SELECT *
          FROM users
          WHERE email = ?
      `,
      [email],
    );
    return rows[0];
  }

  public static async createUser(user: CreateUser) {
    const [result] = await this.pool.query(
      `
          INSERT INTO users (firstname, lastname, email, id_address, nationality, iban, country, phone, bic, role)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.id_address,
        user.nationality,
        user.iban,
        user.country,
        user.phone,
        user.bic,
        user.role,
      ],
    );
    return result;
  }

  public static async resetPassword(user: ResetUserPassword) {
    const [result] = await this.pool.query(
      `
          UPDATE users
          SET password = ?
          WHERE id = ?
      `,
      [user.password, user.id],
    );
    return result;
  }
}
