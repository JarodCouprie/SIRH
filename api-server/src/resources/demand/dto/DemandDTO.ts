import { Demand } from "../../../common/model/Demand.js";
import { DemandStatus } from "../../../common/enum/DemandStatus";
import { DemandType } from "../../../common/enum/DemandType";

export class DemandDTO {
  id: number;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  motivation: string;
  justification: string;
  status: DemandStatus;
  number_day: number;
  id_owner: number;
  type: DemandType;
  file_url?: string;
  id_validator: number;
  validator_firstname: string;
  validator_lastname: string;
  validated_at: Date;

  constructor(demand: Demand, url?: string) {
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
    this.file_url = url || "";
    this.id_validator = demand.id_validator;
    this.validator_firstname = demand.validator_firstname;
    this.validator_lastname = demand.validator_lastname;
    this.validated_at = new Date(`${demand.validated_at} UTC`);
  }
}
