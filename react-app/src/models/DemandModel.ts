export class DemandDTO {
  startDate: Date;
  endDate: Date;
  motivation: string;
  type: DemandType;

  constructor(
    startDate: Date,
    endDate: Date,
    motivation: string,
    type: DemandType,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.motivation = motivation;
    this.type = type;
  }
}

export class DemandAll {
  id: number;
  startDate: Date;
  endDate: Date;
  motivation: string;
  createdAt: Date;
  status: string;
  number_day: number;
  type: DemandType;

  constructor(
    id: number,
    startDate: Date,
    endDate: Date,
    motivation: string,
    createdAt: Date,
    status: string,
    number_day: number,
    type: DemandType,
  ) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.motivation = motivation;
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
