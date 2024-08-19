export class TeamList {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_team: number;
  id_service: number;
  service_label: string;
  lead_team_firstname: string;
  lead_team_lastname: string;

  constructor(
    id: number = 0,
    label: string = "",
    minimum_users: number = 1,
    id_user_lead_team: number = 0,
    id_service: number = 0,
    service_label: string = "",
    lead_team_firstname: string = "",
    lead_team_lastname: string = "",
  ) {
    this.id = id;
    this.label = label;
    this.minimum_users = minimum_users;
    this.id_user_lead_team = id_user_lead_team;
    this.id_service = id_service;
    this.service_label = service_label;
    this.lead_team_firstname = lead_team_firstname;
    this.lead_team_lastname = lead_team_lastname;
  }
}
