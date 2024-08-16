import { Department } from "../../../common/model/Department.js";

export class DepartmentDTO {
  id: number;
  label: string;
  minimum_users: number;
  id_user_lead_service: number;
  id_agency: number;

  constructor(department: Department) {
    this.id = department.id;
    this.label = department.label;
    this.minimum_users = department.minimum_users;
    this.id_user_lead_service = department.id_user_lead_service;
    this.id_agency = department.id_agency;
  }
}
