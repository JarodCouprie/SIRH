export class CreateTeamFormDataModel {
  label: string;
  minimum_user: number;
  id_user_lead_team: number;
  id_service: number;
  members: [];

  constructor(
    label: string = "",
    minimum_user: number = 1,
    id_user_lead_team: number = 1,
    id_service: number = 1,
    members: [] = [],
  ) {
    this.label = label;
    this.minimum_user = minimum_user;
    this.id_user_lead_team = id_user_lead_team;
    this.id_service = id_service;
    this.members = members;
  }
}
