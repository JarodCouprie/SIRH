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

export enum DemandType {
  RTT = "RTT",
  TT = "TT",
  CA = "CA",
}
