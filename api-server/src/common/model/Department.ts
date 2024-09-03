export class Department {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_service: number;
  id_agency: number;
  lead_service_firstname: string;
  lead_service_lastname: string;
  team_count: number;

  constructor(
    id: number,
    label: string,
    minimum_users: number,
    id_user_lead_service: number,
    id_agency: number,
    lead_service_firstname: string,
    lead_service_lastname: string,
    team_count: number,
  ) {
    this.id = id;
    this.label = label;
    this.minimum_users = minimum_users;
    this.id_user_lead_service = id_user_lead_service;
    this.id_agency = id_agency;
    this.lead_service_firstname = lead_service_firstname;
    this.lead_service_lastname = lead_service_lastname;
    this.team_count = team_count;
  }
}

export class CreateDepartment {
  label: string;
  minimum_users: number;
  id_user_lead_service: number;
  id_agency: number;

  constructor(
    label: string,
    minimum_users: number,
    id_user_lead_service: number,
    id_agency: number,
  ) {
    this.label = label;
    this.minimum_users = minimum_users;
    this.id_user_lead_service = id_user_lead_service;
    this.id_agency = id_agency;
  }
}
