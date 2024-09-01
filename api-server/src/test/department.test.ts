import { describe, expect, test } from "vitest";
import { CreateDepartment, Department } from "../common/model/Department";
import { TeamDTO } from "../resources/team/dto/TeamDTO";
import { DepartmentDTO } from "../resources/department/dto/DepartmentDTO";

describe("Department models should be what we give it", () => {
  test("Test Department Model", () => {
    const department = new Department(155, "label", 4, 7, 83);
    expect(department.id).toBe(155);
    expect(department.label).toBe("label");
    expect(department.minimum_users).toBe(4);
    expect(department.id_user_lead_service).toBe(7);
    expect(department.id_agency).toBe(83);
  });
  test("Test CreateDepartment Model", () => {
    const department = new CreateDepartment("label", 12, 4, 7);
    expect(department.label).toBe("label");
    expect(department.minimum_users).toBe(12);
    expect(department.id_user_lead_service).toBe(4);
    expect(department.id_agency).toBe(7);
  });
  test("Test DepartmentDTO", () => {
    const department = new Department(155, "label", 4, 7, 83);
    const departmentDTO = new DepartmentDTO(department);
    expect(departmentDTO.id).toBe(155);
  });
});
