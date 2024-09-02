import { Team, TeamMembers } from "../../../common/model/Team.js";

export class TeamsDTO {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_team: number;
  id_service: number;
  service_label: string;
  lead_team_firstname: string;
  lead_team_lastname: string;
  total_team: number;
  total_present: number;
  status: TeamStatus | undefined;

  constructor(team: Team, totalPresent: number, totalTeam: number) {
    this.id = team.id;
    this.label = team.label;
    this.minimum_users = team.minimum_users;
    this.id_user_lead_team = team.id_user_lead_team;
    this.id_service = team.id_service;
    this.service_label = team.service_label;
    this.lead_team_firstname = team.lead_team_firstname;
    this.lead_team_lastname = team.lead_team_lastname;
    this.total_team = totalTeam;
    this.total_present = totalPresent;
    this.status = calculateStatus(totalPresent, totalTeam);
  }
}

export class TeamDTO {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_team: number;
  id_service: number;
  service_label: string;
  lead_team_firstname: string;
  lead_team_lastname: string;
  lead_team_email: string;
  total_team: number;
  total_present: number;
  status: TeamStatus | undefined;
  members: TeamMembers[];

  constructor(
    team: Team,
    totalPresent: number,
    totalTeam: number,
    members: any[],
  ) {
    this.id = team.id;
    this.label = team.label;
    this.minimum_users = team.minimum_users;
    this.id_user_lead_team = team.id_user_lead_team;
    this.id_service = team.id_service;
    this.service_label = team.service_label;
    this.lead_team_firstname = team.lead_team_firstname;
    this.lead_team_lastname = team.lead_team_lastname;
    this.lead_team_email = team.lead_team_email;
    this.total_team = totalTeam;
    this.total_present = totalPresent;
    this.status = calculateStatus(totalPresent, totalTeam);
    this.members = members.map((member) => new TeamMembers(member));
  }
}

const calculateStatus = (totalPresent: number, totalTeam: number) => {
  const percent = totalPresent / totalTeam;
  let status = "";
  if (percent < 0.33) {
    return (status = TeamStatus.NOT_ENOUGH);
  }
  if (percent >= 0.33 && percent < 0.66) {
    return (status = TeamStatus.UNDERSTAFFED);
  }
  if (percent >= 0.66 && percent < 1) {
    return (status = TeamStatus.ENOUGH);
  }
  if (percent === 1) {
    return (status = TeamStatus.COMPLETE);
  }
};

enum TeamStatus {
  NOT_ENOUGH = "NOT_ENOUGH",
  UNDERSTAFFED = "UNDERSTAFFED",
  ENOUGH = "ENOUGH",
  COMPLETE = "COMPLETE",
}
