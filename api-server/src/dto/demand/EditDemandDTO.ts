import { DemandType } from "../../model/Demand";

export class EditDemandDTO {
  startDate: Date;
  endDate: Date;
  motivation: string;
  type: DemandType;
  number_day: number;

  constructor(
    startDate: Date,
    endDate: Date,
    motivation: string,
    type: DemandType,
    number_day: number,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.motivation = motivation;
    this.type = type;
    this.number_day = number_day;
  }
}
