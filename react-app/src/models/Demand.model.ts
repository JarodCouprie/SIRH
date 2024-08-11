export class DemandDTO {
  start_date: Date;
  end_date: Date;
  motivation: string;
  type: DemandType;
  status: string;
  file_key?: string;

  constructor(
    start_date: Date,
    end_date: Date,
    motivation: string,
    type: DemandType,
    status: string,
    file_key?: string,
  ) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.motivation = motivation;
    this.type = type;
    this.status = status;
    this.file_key = file_key;
  }
}

export class DemandAll {
  id: number;
  start_date: Date;
  end_date: Date;
  motivation: string;
  created_at: Date;
  status: DemandStatus;
  number_day: number;
  id_owner: number;
  file_key: string;
  type: DemandType;

  constructor(
    id: number = 0,
    start_date: Date = new Date(),
    end_date: Date = new Date(),
    motivation: string = "",
    created_at: Date = new Date(),
    status: DemandStatus = DemandStatus.DRAFT,
    number_day: number = 0,
    id_owner: number = 0,
    file_key: string = "",
    type: DemandType = DemandType.CA,
  ) {
    this.id = id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.motivation = motivation;
    this.created_at = created_at;
    this.status = status;
    this.number_day = number_day;
    this.id_owner = id_owner;
    this.file_key = file_key;
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

export enum DemandStatus {
  ACCEPTED = "ACCEPTED",
  WAITING = "WAITING",
  DENIED = "DENIED",
  DRAFT = "DRAFT",
}
