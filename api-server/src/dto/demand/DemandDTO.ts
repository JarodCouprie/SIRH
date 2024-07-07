import { Demand, DemandType } from "../../model/Demand";

export class DemandDTO {
  id: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  status: string;
  number_day: number;
  type: DemandType;

  constructor(demand: Demand) {
    this.id = demand.id;
    this.startDate = demand.startDate;
    this.endDate = demand.endDate;
    this.createdAt = new Date(`${demand.createdAt} UTC`);
    this.status = demand.status;
    this.number_day = demand.number_day;
    this.type = demand.type;
  }
}
