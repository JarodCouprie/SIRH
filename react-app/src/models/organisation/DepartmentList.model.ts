export class DepartmentList {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_service: number;
  lead_service_lastname: string;
  lead_service_firstname: string;
  team_count: number;
  count_team: number;

  constructor(
    id: number = 0,
    label: string = "",
    minimum_users: number = 1,
    id_user_lead_service: number = 1,
    lead_service_lastname: string = "",
    lead_service_firstname: string = "",
    team_count: number = 0,
    count_team: number = 0,
  ) {
    this.id = id;
    this.label = label;
    this.minimum_users = minimum_users;
    this.id_user_lead_service = id_user_lead_service;
    this.lead_service_lastname = lead_service_lastname;
    this.lead_service_firstname = lead_service_firstname;
    this.team_count = team_count;
    this.count_team = count_team;
  }
}
