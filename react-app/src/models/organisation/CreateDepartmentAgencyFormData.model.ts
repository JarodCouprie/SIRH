export class CreateDepartmentAgencyFormDataModel {
  label: string;
  minimum_user: number;
  id_user_lead_service: number;

  constructor(
    label: string = "",
    minimum_user: number = 1,
    id_user_lead_service: number = 1,
  ) {
    this.label = label;
    this.minimum_user = minimum_user;
    this.id_user_lead_service = id_user_lead_service;
  }
}
