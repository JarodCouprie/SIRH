import { Demand, DemandType } from "../../model/Demand";

export class DemandDTO {
  id: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  motivation: string;
  status: string;
  number_day: number;
  type: DemandType;

  constructor(demand: Demand) {
    this.id = demand.id;
    this.startDate = demand.startDate;
    this.endDate = demand.endDate;
    this.createdAt = new Date(`${demand.createdAt} UTC`);
    this.motivation = demand.motivation;
    this.status = demand.status;
    this.number_day = demand.number_day;
    this.type = demand.type;
  }
}
