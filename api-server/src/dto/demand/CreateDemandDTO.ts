import { DemandType } from "../../model/Demand.js";

export class CreateDemand {
  start_date: Date;
  end_date: Date;
  motivation: string;
  status: string;
  type: DemandType;
  number_day: number;
  file_key: string;
  idOwner: number;

  constructor(
    start_date: Date,
    end_date: Date,
    motivation: string,
    status: string,
    type: DemandType,
    number_day: number,
    file_key: string,
    idOwner: number,
  ) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.motivation = motivation;
    this.status = status;
    this.type = type;
    this.number_day = number_day;
    this.file_key = file_key;
    this.idOwner = idOwner;
  }
}
