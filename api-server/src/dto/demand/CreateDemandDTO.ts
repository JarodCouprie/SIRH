import { DemandType } from "../../model/Demand";

export class CreateDemand {
  startDate: Date;
  endDate: Date;
  motivation: string;
  status: string;
  type: DemandType;
  number_day: number;
  idOwner: number;

  constructor(
    startDate: Date,
    endDate: Date,
    motivation: string,
    status: string,
    type: DemandType,
    number_day: number,
    idOwner: number,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.motivation = motivation;
    this.status = status;
    this.type = type;
    this.number_day = number_day;
    this.idOwner = idOwner;
  }
}
