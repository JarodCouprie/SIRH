import src from "../index.js";

export class Demand {
  id: number;
  start_date: Date;
  end_date: Date;
  motivation: string;
  created_at: Date;
  status: DemandStatus;
  type: DemandType;
  number_day: number;
  file_key?: string;
  id_owner: number;
  id_validator: number;

  constructor(
    id: number,
    start_date: Date,
    end_date: Date,
    motivation: string,
    created_at: Date,
    status: DemandStatus,
    type: DemandType,
    number_day: number,
    id_owner: number,
    id_validator: number,
    file_key?: string,
  ) {
    this.id = id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.motivation = motivation;
    this.created_at = created_at;
    this.status = status;
    this.type = type;
    this.number_day = number_day;
    this.id_owner = id_owner;
    this.id_validator = id_validator;
    this.file_key = file_key;
  }
}

export class ValidatedDemand {
  id: number;
  start_date: Date;
  end_date: Date;
  motivation: string;
  justification: string;
  created_at: Date;
  status: DemandStatus;
  type: DemandType;
  number_day: number;
  id_owner: number;
  id_validator: number;
  validator_firstname: string;
  validator_lastname: string;
  validated_at: Date;

  constructor(
    id: number,
    start_date: Date,
    end_date: Date,
    motivation: string,
    justification: string,
    created_at: Date,
    status: DemandStatus,
    type: DemandType,
    number_day: number,
    id_owner: number,
    id_validator: number,
    validator_firstname: string,
    validator_lastname: string,
    validated_at: Date,
  ) {
    this.id = id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.motivation = motivation;
    this.justification = justification;
    this.created_at = created_at;
    this.status = status;
    this.type = type;
    this.number_day = number_day;
    this.id_owner = id_owner;
    this.id_validator = id_validator;
    this.validator_firstname = validator_firstname;
    this.validator_lastname = validator_lastname;
    this.validated_at = validated_at;
  }
}

export class ConfirmDemand {
  id: number;
  validatorId: number;
  status: DemandStatus;
  validated_at: string;

  constructor(id: number, validatorId: number) {
    this.id = id;
    this.validatorId = validatorId;
    this.status = DemandStatus.ACCEPTED;
    this.validated_at = new Date()
      .toISOString()
      .split("Z")[0]
      .replace("T", " ")
      .split(".")[0];
  }
}

export class RejectDemand {
  id: number;
  validatorId: number;
  justification: string;
  status: DemandStatus;
  validated_at: string;

  constructor(id: number, validatorId: number, justification: string) {
    this.id = id;
    this.validatorId = validatorId;
    this.justification = justification;
    this.status = DemandStatus.DENIED;
    this.validated_at = new Date()
      .toISOString()
      .split("Z")[0]
      .replace("T", " ")
      .split(".")[0];
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
  ABSENCE = "ABSENCE",
  SICKNESS = "SICKNESS",
}

export enum DemandStatus {
  ACCEPTED = "ACCEPTED",
  WAITING = "WAITING",
  DENIED = "DENIED",
  DRAFT = "DRAFT",
}
