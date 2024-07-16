export class Demand {
  id: number;
  startDate: Date;
  endDate: Date;
  motivation: string;
  createdAt: Date;
  status: DemandStatus;
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
    status: DemandStatus,
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
  status: DemandStatus;

  constructor(id: number, status: DemandStatus) {
    this.id = id;
    this.status = status;
  }
}

export class NumberDayDemand {
  id: number;
  number_day: number;
  type: DemandType;

  constructor(id: number, number_day: number, type: DemandType) {
    this.id = id;
    this.number_day = number_day;
    this.type = type;
  }
}

export enum DemandType {
  RTT = "RTT",
  TT = "TT",
  CA = "CA",
}
export enum DemandStatus {
  ACCEPTED = "ACCEPTED",
  WAITING = "WAITING",
  DENIED = "DENIED",
  DRAFT = "DRAFT",
}
