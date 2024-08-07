import {
  DemandStatus,
  DemandType,
  ValidatedDemand,
} from "../../model/Demand.js";

export class DemandValidatedDTO {
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

  constructor(demand: ValidatedDemand) {
    this.id = demand.id;
    this.start_date = demand.start_date;
    this.end_date = demand.end_date;
    this.created_at = new Date(`${demand.created_at} UTC`);
    this.motivation = demand.motivation;
    this.justification = demand.justification;
    this.status = demand.status;
    this.number_day = demand.number_day;
    this.id_owner = demand.id_owner;
    this.type = demand.type;
    this.id_validator = demand.id_validator;
    this.validator_firstname = demand.validator_firstname;
    this.validator_lastname = demand.validator_lastname;
  }
}
