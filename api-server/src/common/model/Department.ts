export class Department {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_service: number;
  id_agency: number;

  constructor(
    id: number,
    label: string,
    minimum_users: number,
    id_user_lead_service: number,
    id_agency: number,
  ) {
    this.id = id;
    this.label = label;
    this.minimum_users = minimum_users;
    this.id_user_lead_service = id_user_lead_service;
    this.id_agency = id_agency;
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
