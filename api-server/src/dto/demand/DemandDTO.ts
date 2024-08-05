import { Demand, DemandType } from "../../model/Demand.js";

export class DemandDTO {
  id: number;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  motivation: string;
  status: string;
  number_day: number;
  type: DemandType;

  constructor(demand: Demand) {
    this.id = demand.id;
    this.start_date = demand.start_date;
    this.end_date = demand.end_date;
    this.created_at = new Date(`${demand.created_at} UTC`);
    this.motivation = demand.motivation;
    this.status = demand.status;
    this.number_day = demand.number_day;
    this.type = demand.type;
  }
}
