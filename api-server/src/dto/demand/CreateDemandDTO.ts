import { DemandType } from "../../model/Demand";

export class CreateDemand {
  startDate: Date;
  endDate: Date;
  motivation: string;
  status: string;
  type: DemandType;
  number_day: number;
  file_key: string;
  idOwner: number;

  constructor(
    startDate: Date,
    endDate: Date,
    motivation: string,
    status: string,
    type: DemandType,
    number_day: number,
    file_key: string,
    idOwner: number,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.motivation = motivation;
    this.status = status;
    this.type = type;
    this.number_day = number_day;
    this.file_key = file_key;
    this.idOwner = idOwner;
  }
}
