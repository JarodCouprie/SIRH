export class Team {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_service: number;
  id_service: number;
  service_label: string;

  constructor(
    id: number,
    label: string,
    minimum_users: number,
    id_user_lead_service: number,
    id_service: number,
    service_label: string,
  ) {
    this.id = id;
    this.label = label;
    this.minimum_users = minimum_users;
    this.id_user_lead_service = id_user_lead_service;
    this.id_service = id_service;
    this.service_label = service_label;
  }
}
