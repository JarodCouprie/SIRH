import { DemandType } from "../../../common/enum/DemandType";

export class EditDemandDTO {
  start_date: Date;
  end_date: Date;
  motivation: string;
  type: DemandType;
  number_day: number;
  key: string;
  status: string;

  constructor(
    start_date: Date,
    end_date: Date,
    motivation: string,
    type: DemandType,
    number_day: number,
    key: string,
    status: string,
  ) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.motivation = motivation;
    this.type = type;
    this.number_day = number_day;
    this.key = key;
    this.status = status;
  }
}
