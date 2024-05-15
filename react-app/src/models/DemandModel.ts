import { DemandType } from "@/pages/demand/DemandDetail.tsx";

export class DemandDTO {
  id: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  status: string;
  number_day: number;
  motivation: string;
  type: DemandType;

  constructor(
    id: number,
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    status: string,
    number_day: number,
    motivation: string,
    type: DemandType,
  ) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = createdAt;
    this.status = status;
    this.number_day = number_day;
    this.motivation = motivation;
    this.type = type;
  }
}
export enum DemandType {
  RTT = "RTT",
  TT = "TT",
  CA = "CA",
}
