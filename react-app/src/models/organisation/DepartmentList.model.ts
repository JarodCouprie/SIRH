export class DepartmentList {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_service: number;

  constructor(
    id: number = 0,
    label: string = "",
    minimum_users: number = 1,
    id_user_lead_service: number = 1,
  ) {
    this.id = id;
    this.label = label;
    this.minimum_users = minimum_users;
    this.id_user_lead_service = id_user_lead_service;
  }
}
