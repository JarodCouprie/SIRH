import { Request } from "express";
import { ControllerResponse } from "../../common/helper/ControllerResponse.js";
import { AgencyRepository } from "../agency/AgencyRepository.js";
import { logger } from "../../common/helper/Logger.js";
import { DepartmentRepository } from "./DepartmentRepository.js";
import { CreateDepartment, Department } from "../../common/model/Department.js";
import { DepartmentDTO, EditDepartment } from "./dto/DepartmentDTO.js";
import { DemandDTO } from "../demand/dto/DemandDTO.js";
import { DemandRepository } from "../demand/DemandRepository.js";
import { UserService } from "../user/UserService.js";
import { updateUserDays } from "../demand/DemandService.js";
import { AgencyList } from "../agency/dto/AgencyDTO";
import request from "supertest";

export class DepartmentService {
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

  public static async getDepartmentById(id: number) {
    try {
      const department: any = await DepartmentRepository.getDepartmentById(id);
      const countMember =
        await DepartmentRepository.getCountUserInTeamService(id);
      if (!department) {
        return new ControllerResponse(401, "Departments doesn't exist");
      }

      const department_: DepartmentDTO = new DepartmentDTO(
        department,
        countMember,
      );
      return new ControllerResponse(200, "", department_);
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

  public static async updateDepartment(idDepartment: number, req: Request) {
    try {
      const department: CreateDepartment = req.body;
      await DepartmentRepository.updateDepartment(department, idDepartment);
      const countMember =
        await DepartmentRepository.getCountUserInTeamService(idDepartment);
      const department_ =
        await DepartmentRepository.getDepartmentById(idDepartment);

      if (!department_) {
        return new ControllerResponse(401, "L'agence n'existe pas");
      }

      const departmentSend = new EditDepartment(department_, countMember);

      return new ControllerResponse(
        200,
        "Adresse de l'agence modifiée",
        departmentSend,
      );
    } catch (error) {
      return new ControllerResponse(500, "Impossible de modifier le service");
    }
  }

  public static async deleteDepartment(idDepartment: number) {
    try {
      const department: any = await this.getDepartmentById(+idDepartment);

      if (!department) {
        return new ControllerResponse(404, "pas de service");
      }

      await DepartmentRepository.deleteDepartment(+idDepartment);
      return new ControllerResponse(200, "");
    } catch (error) {
      logger.error(`Failed to delete the department. Error: ${error}`);
      return new ControllerResponse(500, "Failed to delete the department");
    }
  }
}
