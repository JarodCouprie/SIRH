import { DatabaseClient } from "../helper/DatabaseClient";
import { Demand } from "../model/Demand";
import { CreateDemand } from "../dto/demand/CreateDemandDTO";
import { EditDemandDTO } from "../dto/demand/EditDemandDTO";

export class DemandRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async getDemand() {
    const [rows] = await this.pool.query("SELECT * FROM demand");
    return rows;
  }

  public static async getDemandById(id: number) {
    const [rows]: any = await this.pool.query(
      `
                SELECT *
                FROM demand
                WHERE id = ?
            `,
      [id],
    );
    return rows[0];
  }

  public static async editDemand(id: number, demand: EditDemandDTO) {
    const [rows]: any = await this.pool.query(
      `
                UPDATE demand
                SET startDate=?,
                    endDate    = ?,
                    motivation = ?,
                    type       = ?
                WHERE id = ?
                LIMIT 1;
                
            `,
      [demand.startDate, demand.endDate, demand.motivation, demand.type, id],
    );
    return rows[0];
  }

  public static async deleteDemand(id: number) {
    console.log(id);
    const [rows]: any = await this.pool.query(
      `
            DELETE FROM demand WHERE id=?;
            `,
      [id],
    );
    return rows[0];
  }

  public static async createDemand(demand: CreateDemand) {
    const [rows]: any = await this.pool.query(
      `
                INSERT INTO demand (startDate,
                                    endDate,
                                    motivation,
                                    status,
                                    type,
                                    id_user_create_demand
                                    )
                VALUES (?,?, ?, ?, ?, ?)
            `,
      [
        demand.startDate,
        demand.endDate,
        demand.motivation,
        demand.status,
        demand.type,
        demand.idOwner,
      ],
    );
    return rows[0];
  }
}
