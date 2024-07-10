export class Demand {
  id: number;
  startDate: Date;
  endDate: Date;
  motivation: string;
  createdAt: Date;
  status: string;
  type: DemandType;
  number_day: number;
  idOwner: number;
  idValidator: number;

  constructor(
    id: number,
    startDate: Date,
    endDate: Date,
    motivation: string,
    createdAt: Date,
    status: string,
    type: DemandType,
    number_day: number,
    idOwner: number,
    idValidator: number,
  ) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.motivation = motivation;
    this.createdAt = createdAt;
    this.status = status;
    this.type = type;
    this.number_day = number_day;
    this.idOwner = idOwner;
    this.idValidator = idValidator;
  }
}

export class StatusDemand {
  id: number;
  status: string;

  constructor(id: number, status: string) {
    this.id = id;
    this.status = status;
  }
}

export enum DemandType {
  RTT = "RTT",
  TT = "TT",
  CA = "CA",
}
