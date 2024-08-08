import { Demand, DemandType, DemandStatus } from "../../model/Demand.js";

export class DemandDTO {
  id: number;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  motivation: string;
  status: DemandStatus;
  number_day: number;
  id_owner: number;
  type: DemandType;
  file_key?: string;
  id_validator: number;

  constructor(demand: Demand, url?: string) {
    this.id = demand.id;
    this.start_date = demand.start_date;
    this.end_date = demand.end_date;
    this.created_at = new Date(`${demand.created_at} UTC`);
    this.motivation = demand.motivation;
    this.status = demand.status;
    this.number_day = demand.number_day;
    this.id_owner = demand.id_owner;
    this.type = demand.type;
    this.file_key = url || "";
    this.id_validator = demand.id_validator;
  }
}
