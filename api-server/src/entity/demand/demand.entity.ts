import { DemandType } from "../../model/Demand.js";

export interface DemandEntity {
  id: number;
  start_date: Date;
  end_date: Date;
  motivation: string;
  justification: string;
  created_at: Date;
  status: string;
  type: DemandType;
  number_day: number;
  file_key: string;
  id_owner: number;
  id_validator: number;
  validated_at: Date;
}
