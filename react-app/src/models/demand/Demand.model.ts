import { DemandStatus } from "@/enum/DemandStatus.enum.js";
import { DemandType } from "@/enum/DemandType.enum.js";

export class Demand {
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
  file_key: string;
  file_url: string;

  constructor(
    id: number = 0,
    start_date: Date = new Date(),
    end_date: Date = new Date(),
    motivation: string = "",
    justification: string = "",
    created_at: Date = new Date(),
    status: DemandStatus = DemandStatus.DRAFT,
    type: DemandType = DemandType.CA,
    number_day: number = 0,
    id_owner: number = 0,
    id_validator: number = 0,
    validator_firstname: string = "",
    validator_lastname: string = "",
    validated_at: Date = new Date(),
    file_key: string = "",
    file_url: string = "",
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
    this.file_key = file_key;
    this.file_url = file_url;
  }
}
