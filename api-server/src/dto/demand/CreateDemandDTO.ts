import { DemandType } from "../../model/Demand";

export class CreateDemand {
  startDate: Date;
  endDate: Date;
  motivation: string;
  status: string;
  type: DemandType;
  idOwner: number;

  constructor(
    startDate: Date,
    endDate: Date,
    motivation: string,
    status: string,
    type: DemandType,
    idOwner: number,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.motivation = motivation;
    this.status = status;
    this.type = type;
    this.idOwner = idOwner;
  }
}
