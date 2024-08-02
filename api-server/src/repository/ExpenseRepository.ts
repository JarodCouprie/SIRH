import { DatabaseClient } from "../helper/DatabaseClient";
import { Expense, ExpenseStatus } from "../model/Expense";

export class ExpenseRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async getExpensesValues(offset: number, limit: number) {
    const [rows]: any = await this.pool.query(
      `
              SELECT *
              FROM expense
              ORDER BY facturation_date DESC
              LIMIT ?,?;
          `,
      [offset, limit],
    );
    return rows;
  }

  public static async getExpensesCount() {
    const [rows]: any = await this.pool.query(
      `
              SELECT COUNT(*) AS count
              FROM expense;
          `,
      [],
    );
    return rows[0].count;
  }

  public static async getExpensesValuesByType(
    offset: number,
    limit: number,
    type: string,
  ) {
    const [rows]: any = await this.pool.query(
      `
              SELECT *
              FROM expense WHERE type = ?
              ORDER BY id
              LIMIT ?,?;
          `,
      [type, offset, limit],
    );
    return rows;
  }

  public static async getExpensesValuesByUserId(
    user_id: number,
    offset: number,
    limit: number,
  ) {
    const [rows]: any = await this.pool.query(
      `
                SELECT *
                FROM expense
                WHERE id_owner = ?
                ORDER BY id
                LIMIT ?,?;
            `,
      [user_id, offset, limit],
    );
    return rows;
  }

  public static async getExpensesValuesByUserIdAndType(
    user_id: number,
    offset: number,
    limit: number,
    type: string,
  ) {
    const [rows]: any = await this.pool.query(
      `
                SELECT *
                FROM expense
                WHERE id_owner = ? AND type = ?
                ORDER BY facturation_date DESC
                LIMIT ?,?;
            `,
      [user_id, type, offset, limit],
    );
    return rows;
  }
  public static async getExpensesCountByUserId(id_owner: number) {
    const [rows]: any = await this.pool.query(
      `
              SELECT COUNT(*) AS count
              FROM expense
              WHERE id_owner = ?
              ORDER BY facturation_date DESC;
          `,
      [id_owner],
    );
    return rows[0].count;
  }

  public static async getExpensesCountByType(type: string) {
    const [rows]: any = await this.pool.query(
      `
              SELECT COUNT(*) AS count
              FROM expense
              WHERE type =  ?
              ORDER BY facturation_date DESC;
          `,
      [type],
    );
    return rows[0].count;
  }
  public static async getExpensesCountByTypeAndUserId(
    type: string,
    id_owner: number,
  ) {
    const [rows]: any = await this.pool.query(
      `
              SELECT COUNT(*) AS count
              FROM expense
              WHERE type = ?
              AND id_owner = ?;
          `,
      [type, id_owner],
    );
    return rows[0].count;
  }

  public static async createExpenseDemand(expense: Expense) {
    const [result]: any = await this.pool.query(
      `
            INSERT INTO expense (type, amount, motivation, status, id_owner, facturation_date, file_key)
            VALUES (?,?,?,?,?,?,?);
            `,
      [
        expense.type,
        expense.amount,
        expense.motivation,
        expense.status,
        expense.id_owner,
        expense.facturation_date,
        expense.fileKey,
      ],
    );
    return result;
  }

  public static async updateExpenseDemand(id: string, expense: Expense) {
    const [result]: any = await this.pool.query(
      `
            UPDATE expense
            SET type = ?,
            amount = ?,
            motivation = ?,
            facturation_date = ?,
            file_key = ?
            WHERE id = ?;
            `,
      [
        expense.type,
        expense.amount,
        expense.motivation,
        expense.facturation_date,
        expense.fileKey,
        id,
      ],
    );
    return result;
  }

  public static async delExpenseDemand(id: string) {
    const [result]: any = await this.pool.query(
      `
            DELETE FROM expense WHERE id=?;
            `,
      [id],
    );
    return result;
  }

  public static async getExpenseDemand(id: string) {
    const [row]: any = await this.pool.query(
      `
            SELECT * FROM expense WHERE id=?;
            `,
      [id],
    );
    return row[0];
  }

  public static async confirmExpenseDemand(
    id: number,
    status: ExpenseStatus,
    validatorId: number,
  ) {
    const [result]: any = await this.pool.query(
      `
            UPDATE expense
            SET status = ?,
            id_validator = ?
            WHERE id = ?;
            `,
      [status, validatorId, id],
    );
    return result;
  }

  public static async getExpensesAmountDateAndStatus() {
    const [rows]: any = await this.pool.query(
      `
        SELECT amount, 
               facturation_date,
               status
        FROM expense;
      `,
      [],
    );
    return rows;
  }
  public static async getExpensesAmountDateAndStatusByUserId(user_id: string) {
    const [rows]: any = await this.pool.query(
      `
        SELECT amount,
               facturation_date,
               status
        FROM expense
        WHERE id_owner = ?;
      `,
      [user_id],
    );
    return rows;
  }

  public static async getExpensesAmountDateAndStatusByDate(
    monthName: string,
    year: string,
  ) {
    const [rows]: any = await this.pool.query(
      `
        SELECT amount, 
               facturation_date,
               status
        FROM expense
        WHERE date_format(facturation_date, '%M') = ?
        AND date_format(facturation_date, '%Y') = ?;
      `,
      [monthName, year],
    );
    return rows;
  }
  public static async getExpensesAmountDateAndStatusByUserIdAndDate(
    user_id: number,
    monthName: string,
    year: string,
  ) {
    const [rows]: any = await this.pool.query(
      `
        SELECT amount,
               facturation_date,
               status
        FROM expense
        WHERE id_owner = ?
        AND date_format(facturation_date, '%M') = ? 
        AND date_format(facturation_date, '%Y') = ?;
      `,
      [user_id, monthName, year],
    );
    return rows;
  }
}
