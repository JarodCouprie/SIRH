import { DemandStatus } from "@/enum/DemandStatus.enum.js";
import { DemandType } from "@/enum/DemandType.enum.js";

export class DemandDTO {
  start_date: Date;
  end_date: Date;
  motivation: string;
  type: DemandType;
  status: string;
  file_url?: string;

  constructor(
    start_date: Date,
    end_date: Date,
    motivation: string,
    type: DemandType,
    status: string,
    file_url?: string,
  ) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.motivation = motivation;
    this.type = type;
    this.status = status;
    this.file_url = file_url;
  }
}

export class DemandList {
  id: number;
  start_date: Date;
  end_date: Date;
  motivation: string;
  created_at: Date;
  status: DemandStatus;
  number_day: number;
  id_owner: number;
  file_url: string;
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
    file_url: string = "",
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
    this.file_url = file_url;
    this.type = type;
  }
}
