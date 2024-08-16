import { Department } from "./Department.js";

export class Team {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_team: number;
  id_service: number;
  service_label: string;

  constructor(
    id: number,
    label: string,
    minimum_users: number,
    id_user_lead_team: number,
    id_service: number,
    service_label: string,
  ) {
    this.id = id;
    this.label = label;
    this.minimum_users = minimum_users;
    this.id_user_lead_team = id_user_lead_team;
    this.id_service = id_service;
    this.service_label = service_label;
  }
}

export class CreateTeam {
  label: string;
  minimum_users: number;
  id_user_lead_team: number;
  id_service: number;
  members: number[];

  constructor(
    label: string,
    minimum_users: number,
    id_user_lead_team: number,
    id_service: number,
    members: number[],
  ) {
    this.label = label;
    this.minimum_users = minimum_users;
    this.id_user_lead_team = id_user_lead_team;
    this.id_service = id_service;
    this.members = members;
  }
}
