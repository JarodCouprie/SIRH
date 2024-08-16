import { Request } from "express";
import { ControllerResponse } from "../../common/helper/ControllerResponse.js";
import { AgencyRepository } from "../agency/AgencyRepository.js";
import { logger } from "../../common/helper/Logger.js";
import { DepartmentRepository } from "./DepartmentRepository.js";
import { CreateDepartment, Department } from "../../common/model/Department.js";
import { DepartmentDTO } from "./dto/DepartmentDTO.js";

export class DepartmentService {
  public static async getDepartmentByAgencyWithoutPagination(idAgency: number) {
    try {
      const departments: any =
        await DepartmentRepository.getDepartmentByAgencyIdWithoutCount(
          idAgency,
        );

      if (!departments) {
        return new ControllerResponse(401, "Departments doesn't exist");
      }
      const departmentsDto: DepartmentDTO[] = departments.map(
        (department: Department) => new DepartmentDTO(department),
      );
      return new ControllerResponse(200, "", {
        list: departmentsDto,
      });
    } catch (error) {
      logger.error(`Failed to get the departments. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get departments");
    }
  }

  public static async getDepartmentByAgency(idAgency: number) {
    try {
      const departments: any =
        await DepartmentRepository.getDepartmentByAgencyId(idAgency);
      const departmentsCount =
        await DepartmentRepository.getCountByAgencyId(idAgency);

      if (!departments) {
        return new ControllerResponse(401, "Departments doesn't exist");
      }
      const departmentsDto: DepartmentDTO[] = departments.map(
        (department: Department) => new DepartmentDTO(department),
      );
      return new ControllerResponse(200, "", {
        totalData: departmentsCount,
        list: departmentsDto,
      });
    } catch (error) {
      logger.error(`Failed to get the departments. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get departments");
    }
  }

  public static async createDepartment(idAgency: number, req: Request) {
    const label = req.body.label;
    const minimal_number = req.body.minimum_user;
    const id_user_lead_service = req.body.id_user_lead_service;
    const agency = await AgencyRepository.getAgencyById(idAgency);

    if (agency) {
      const newDepartment = new CreateDepartment(
        label,
        minimal_number,
        id_user_lead_service,
        +idAgency,
      );
      console.log(newDepartment);
      const createdDepartment =
        await DepartmentRepository.createDepartment(newDepartment);

      return new ControllerResponse(
        201,
        "Service créé avec succès",
        createdDepartment,
      );
    } else {
      return new ControllerResponse(500, "Impossible de créer le service");
    }
  }
}
