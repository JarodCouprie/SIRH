import { Demand, DemandType } from "../../model/Demand";

export class DemandDTO {
  id: number;
  startDate: Date;
  endDate: Date;
  created_at: Date;
  status: string;
  number_day: number;
  type: DemandType;

  constructor(demand: Demand) {
    this.id = demand.id;
    this.startDate = demand.startDate;
    this.endDate = demand.endDate;
    this.created_at = demand.created_at;
    this.status = demand.status;
    this.number_day = demand.number_day;
    this.type = demand.type;
  }
}
