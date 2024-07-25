export class DemandDTO {
  start_date: Date;
  end_date: Date;
  motivation: string;
  type: DemandType;
  status: string;

  constructor(
    start_date: Date,
    end_date: Date,
    motivation: string,
    type: DemandType,
    status: string,
  ) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.motivation = motivation;
    this.type = type;
    this.status = status;
  }
}

export class DemandAll {
  id: number;
  start_date: Date;
  end_date: Date;
  motivation: string;
  created_at: Date;
  status: string;
  number_day: number;
  type: DemandType;

  constructor(
    id: number,
    start_date: Date,
    end_date: Date,
    motivation: string,
    created_at: Date,
    status: string,
    number_day: number,
    type: DemandType,
  ) {
    this.id = id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.motivation = motivation;
    this.created_at = created_at;
    this.status = status;
    this.number_day = number_day;
    this.type = type;
  }
}

export enum DemandType {
  RTT = "RTT",
  TT = "TT",
  CA = "CA",
  ABSENCE = "ABSENCE",
  SICKNESS = "SICKNESS",
}
