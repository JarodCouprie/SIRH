import { CreateUser, ResetUserPassword } from "../model/User.js";
import { DatabaseClient } from "../helper/DatabaseClient.js";
import { UpdateUserInfoDTO } from "../dto/user/UpdateUserInfoDTO.js";
import { UpdateUserBankInfosDTO } from "../dto/user/UpdateUserBankInfosDTO.js";

export class UserRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async getUsers() {
    const [rows] = await this.pool.query("SELECT * FROM users");
    return rows;
  }

  public static async getUserEntityById(id: number) {
    const [rows]: any = await this.pool.query(
      `
          SELECT *
          FROM users
          WHERE users.id = ?
      `,
      [id],
    );
    return rows[0];
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
          SELECT users.id as id,
                 email,
                 firstname,
                 lastname,
                 email,
                 phone,
                 street,
                 streetNumber,
                 locality,
                 zipcode,
                 lat,
                 lng,
                 created_at,
                 active,
                 image_key
          FROM users
                   LEFT JOIN address ON users.id_address = address.id
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
          SELECT users.id                  as id,
                 email,
                 country,
                 nationality,
                 iban,
                 bic,
                 firstname,
                 lastname,
                 email,
                 phone,
                 locality,
                 street,
                 streetNumber,
                 lat,
                 lng,
                 zipcode,
                 created_at,
                 active,
                 ca,
                 tt,
                 rtt,
                 image_key,
                 JSON_ARRAYAGG(role.label) AS roles
          FROM users
                   LEFT JOIN address ON users.id_address = address.id
                   JOIN own_role ON users.id = own_role.id_user
                   JOIN role ON role.id = own_role.id_role
          WHERE users.id = ?
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
          INSERT INTO users (firstname, lastname, email, id_address, nationality, iban, country, phone, bic)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      ],
    );
    return result;
  }

  public static async setUserNewRoles(roles: number[], id: number) {
    const rolesMapped = roles.map((role) => [id, role]);
    await this.pool.query(
      `
          DELETE
          FROM own_role
          WHERE id_user = ?
      `,
      [id],
    );
    const [result] = await this.pool.query(
      `INSERT INTO own_role(id_user, id_role)
       VALUES ?`,
      [rolesMapped],
    );
    return result;
  }

  public static async setUserNewProfilePicture(key: string, id: number) {
    const [result] = await this.pool.query(
      `UPDATE users
       SET image_key = ?
       WHERE id = ?`,
      [key, id],
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

  public static async updateUserDays(
    id: number,
    rtt: number,
    ca: number,
    tt: number,
  ) {
    const [result] = await this.pool.query(
      `
          UPDATE users
          SET rtt = ?,
              ca  = ?,
              tt  = ?
          WHERE id = ?
      `,
      [rtt, ca, tt, id],
    );
    return result;
  }

  public static async setUserActive(active: boolean, id: number) {
    const [result] = await this.pool.query(
      `UPDATE users
       SET active = ?
       WHERE id = ?`,
      [active, id],
    );
    return result;
  }

  public static async updateUserCountry(country: string, id: number) {
    const [result] = await this.pool.query(
      `UPDATE users
       SET country = ?
       WHERE id = ?`,
      [country, id],
    );
    return result;
  }

  public static async updateUserInfos(body: UpdateUserInfoDTO, id: number) {
    const [result] = await this.pool.query(
      `UPDATE users
       SET firstname   = ?,
           lastname    = ?,
           email       = ?,
           phone       = ?,
           nationality = ?
       WHERE id = ?`,
      [
        body.firstname,
        body.lastname,
        body.email,
        body.phone,
        body.nationality,
        id,
      ],
    );
    return result;
  }

  public static async updateUserBankInfos(
    body: UpdateUserBankInfosDTO,
    id: number,
  ) {
    const [result] = await this.pool.query(
      `UPDATE users
       SET iban = ?,
           bic = ?
       WHERE id = ?`,
      [body.iban, body.bic, id],
    );
    return result;
  }
}
