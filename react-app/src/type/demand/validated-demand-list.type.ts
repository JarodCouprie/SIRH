import { DemandStatus, DemandType } from "@/models/Demand.model.js";

export type DemandValidated = {
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
};
