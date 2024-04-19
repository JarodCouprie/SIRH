export class DemandDTO {
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  status: string;
  type: DemandType;

  constructor(
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    status: string,
    type: DemandType,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = createdAt;
    this.status = status;
    this.type = type;
  }
}
export enum DemandType {
  RTT = "RTT",
  TT = "TT",
  CA = "CA",
}
