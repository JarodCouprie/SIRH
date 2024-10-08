export class DepartmentModel {
  id: number;
  label: string;
  id_user_lead_service: number;
  id_agency: number;
  lead_service_lastname: string;
  lead_service_firstname: string;
  count_team: number;

  constructor(
    id: number = 1,
    label: string = "",
    id_user_lead_service: number = 1,
    id_agency: number = 1,
    lead_service_lastname: string = "",
    lead_service_firstname: string = "",
    count_team: number = 1,
  ) {
    this.id = id;
    this.label = label;
    this.id_user_lead_service = id_user_lead_service;
    this.id_agency = id_agency;
    this.lead_service_lastname = lead_service_lastname;
    this.lead_service_firstname = lead_service_firstname;
    this.count_team = count_team;
  }
}
