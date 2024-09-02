export class Team {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_team: number;
  id_service: number;
  service_label: string;
  lead_team_firstname: string;
  lead_team_lastname: string;
  lead_team_email: string;
  members: TeamMembers[];
  is_present: number | null;

  constructor(
    id: number,
    label: string,
    minimum_users: number,
    id_user_lead_team: number,
    id_service: number,
    service_label: string,
    lead_team_firstname: string,
    lead_team_lastname: string,
    lead_team_email: string,
    members: TeamMembers[],
    is_present: number | null,
  ) {
    this.id = id;
    this.label = label;
    this.minimum_users = minimum_users;
    this.id_user_lead_team = id_user_lead_team;
    this.id_service = id_service;
    this.service_label = service_label;
    this.lead_team_firstname = lead_team_firstname;
    this.lead_team_lastname = lead_team_lastname;
    this.lead_team_email = lead_team_email;
    this.members = members;
    this.is_present = is_present;
  }
}

export class TeamMembers {
  id_member: number;
  member_firstname: string;
  member_lastname: string;
  member_email: string;
  member_avatar: string;
  is_present: number;

  constructor(member: any) {
    this.id_member = member.id_member;
    this.member_firstname = member.member_firstname;
    this.member_lastname = member.member_lastname;
    this.member_email = member.member_email;
    this.member_avatar = member.member_avatar;
    this.is_present = member.is_present;
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
