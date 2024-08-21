import { TeamStatus } from "@/common/enum/TeamStatus.enum.ts";

export class TeamModel {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_team: number;
  id_service: number;
  service_label: string;
  lead_team_firstname: string;
  lead_team_lastname: string;
  total_team: number;
  total_present: number;
  status: TeamStatus;

  constructor(
    id: number = 0,
    label: string = "",
    minimum_users: number = 1,
    id_user_lead_team: number = 0,
    id_service: number = 0,
    service_label: string = "",
    lead_team_firstname: string = "",
    lead_team_lastname: string = "",
    total_team: number = 1,
    total_present: number = 1,
    status: TeamStatus = TeamStatus.COMPLETE,
  ) {
    this.id = id;
    this.label = label;
    this.minimum_users = minimum_users;
    this.id_user_lead_team = id_user_lead_team;
    this.id_service = id_service;
    this.service_label = service_label;
    this.lead_team_firstname = lead_team_firstname;
    this.lead_team_lastname = lead_team_lastname;
    this.total_team = total_team;
    this.total_present = total_present;
    this.status = status;
  }
}
