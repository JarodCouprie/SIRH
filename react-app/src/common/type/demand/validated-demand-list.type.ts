import { DemandStatus } from "@/common/enum/DemandStatus.enum.js";
import { DemandType } from "@/common/enum/DemandType.enum.js";

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
