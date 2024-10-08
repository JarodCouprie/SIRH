import { Department } from "../../../common/model/Department.js";

export class DepartmentDTO {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_service: number;
  id_agency: number;
  lead_service_lastname: string;
  lead_service_firstname: string;
  team_count: number;
  count_team: number;

  constructor(department: Department, countMember: number) {
    this.id = department.id;
    this.label = department.label;
    this.minimum_users = department.minimum_users;
    this.id_user_lead_service = department.id_user_lead_service;
    this.id_agency = department.id_agency;
    this.lead_service_lastname = department.lead_service_lastname;
    this.lead_service_firstname = department.lead_service_firstname;
    this.team_count = department.team_count;
    this.count_team = countMember;
  }
}

export class EditDepartment {
  id: number;
  label: string;
  id_user_lead_service: number;
  lead_service_lastname: string;
  lead_service_firstname: string;
  count_team: number;

  constructor(department: Department, countMember: number) {
    this.id = department.id;
    this.label = department.label;
    this.id_user_lead_service = department.id_user_lead_service;
    this.lead_service_lastname = department.lead_service_lastname;
    this.lead_service_firstname = department.lead_service_firstname;
    this.count_team = countMember;
  }
}
