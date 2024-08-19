import { Team } from "../../../common/model/Team.js";

export class TeamDTO {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_team: number;
  id_service: number;
  service_label: string;
  lead_team_firstname: string;
  lead_team_lastname: string;

  constructor(team: Team) {
    this.id = team.id;
    this.label = team.label;
    this.minimum_users = team.minimum_users;
    this.id_user_lead_team = team.id_user_lead_team;
    this.id_service = team.id_service;
    this.service_label = team.service_label;
    this.lead_team_firstname = team.lead_team_firstname;
    this.lead_team_lastname = team.lead_team_lastname;
  }
}
