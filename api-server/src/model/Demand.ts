export class Demand {
  id: number;
  startDate: Date;
  endDate: Date;
  motivation: string;
  created_at: Date;
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
    created_at: Date,
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
    this.created_at = created_at;
    this.status = status;
    this.type = type;
    this.number_day = number_day;
    this.idOwner = idOwner;
    this.idValidator = idValidator;
  }
}

export enum DemandType {
  RTT = "RTT",
  TT = "TT",
  CA = "CA",
}
