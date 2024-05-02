export class DemandDTO {
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  status: string;
  number_day: number;
  type: DemandType;

  constructor(
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    status: string,
    number_day: number,
    type: DemandType,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = createdAt;
    this.status = status;
    this.number_day = number_day;
    this.type = type;
  }
}
export enum DemandType {
  RTT = "RTT",
  TT = "TT",
  CA = "CA",
}
