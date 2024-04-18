import {DatabaseClient} from "../helper/DatabaseClient";
import {Expense, ExpenseStatus} from "../model/Expense";

export class ExpenseRepository {
    private static pool = DatabaseClient.mysqlPool;

    public static async getExpensesValues(offset: number, limit: number ){
        const [rows]: any = await this.pool.query(
            `
                SELECT *
                FROM expense
                ORDER BY id
                LIMIT ?,?;
            `,
            [offset, limit],
        );
        return rows;
    }

    public static async getExpensesValuesByUserId(user_id:string, offset: number, limit: number ){
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

    public static async createExpenseDemand(expense:Expense) {
        const [result]: any = await this.pool.query(
            `
            INSERT INTO expense (type, amount, motivation, status, id_owner, facturationDate)
            VALUES (?,?,?,?,?,?);
            `,
            [expense.type, expense.amount, expense.motivation, expense.status, expense.ownerId, expense.facturationDate],
        );
        return result;
    }

    public static async updateExpenseDemand(id:string, expense:Expense){
        const [result]: any = await this.pool.query(
            `
            UPDATE expense
            SET type = ?,
            amount = ?,
            motivation = ?,
            facturationDate = ?
            WHERE id = ?;
            `,
            [expense.type, expense.amount, expense.motivation, expense.facturationDate, id],
        );
        return result;
    }

    public static async delExpenseDemand(id:string){
        const [result]: any = await this.pool.query(
            `
            DELETE FROM expense WHERE id=?;
            `,
            [id],
        );
        return result;
    }

    public static async getExpenseDemand(id:string){
        const [row]: any = await this.pool.query(
            `
            SELECT * FROM expense WHERE id=?;
            `,
            [id],
        );
        return row[0];
    }

    public static async confirmExpenseDemand(id:string, status:ExpenseStatus, validatorId:string){
        const [result] : any = await this.pool.query(
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
}