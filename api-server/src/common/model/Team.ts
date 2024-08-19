import { Department } from "./Department.js";

export class Team {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_team: number;
  id_service: number;
  service_label: string;
  lead_team_firstname: string;
  lead_team_lastname: string;

  constructor(
    id: number,
    label: string,
    minimum_users: number,
    id_user_lead_team: number,
    id_service: number,
    service_label: string,
    lead_team_firstname: string,
    lead_team_lastname: string,
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
