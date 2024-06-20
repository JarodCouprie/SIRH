import { ControllerResponse } from "../helper/ControllerResponse";
import { DemandRepository } from "../repository/DemandRepository";
import { Demand, DemandType } from "../model/Demand";
import { logger } from "../helper/Logger";
import { DemandDTO } from "../dto/demand/DemandDTO";
import { CreateDemand } from "../dto/demand/CreateDemandDTO";
import { EditDemandDTO } from "../dto/demand/EditDemandDTO";
import { Request } from "express";
import { UserService } from "./UserService";
import { CustomRequest } from "../helper/CustomRequest";
import userController from "../controller/UserController";
import { User, UserDTO } from "../model/User";

export class DemandService {
  public static async getDemand(req: Request) {
    try {
      const pageSize = req.query.pageSize || "0";
      const pageNumber = req.query.pageNumber || "10";
      const type = req.query.type?.toString() || "";
      const limit = +pageSize;
      const offset = (+pageNumber - 1) * +pageSize;
      let demandCount = await DemandRepository.getDemandCountWithType(type);

      let demands: any = await DemandRepository.getDemandWithType(
        limit,
        offset,
        type,
      );
      if (!type) {
        demands = await DemandRepository.getDemand(limit, offset);
        demandCount = await DemandRepository.getDemandCount();
      }
      const demandDto: DemandDTO[] = demands.map(
        (demand: Demand) => new DemandDTO(demand),
      );
      return new ControllerResponse(200, "", {
        totalData: demandCount,
        list: demandDto,
      });
    } catch (error) {
      logger.error(`Failed to get demand. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get demand");
    }
  }

  public static async getDemandById(id: string) {
    try {
      const demand: any = await DemandRepository.getDemandById(+id);
      if (!demand) {
        return new ControllerResponse(401, "Demand doesn't exist");
      }
      return new ControllerResponse(200, "", demand);
    } catch (error) {
      logger.error(`Failed to get the demand. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get the demand");
    }
  }

  public static async editDemand(id: string, body: EditDemandDTO) {
    try {
      const editDemand = new EditDemandDTO(
        body.startDate,
        body.endDate,
        body.motivation,
        body.type,
      );
      await DemandRepository.editDemand(+id, editDemand);
      const demand: any = await DemandRepository.getDemandById(+id);
      if (!demand) {
        return new ControllerResponse(401, "Demand doesn't exist");
      }
      return new ControllerResponse(200, "", demand);
    } catch (error) {
      logger.error(`Failed to edit the demand. Error: ${error}`);
      return new ControllerResponse(500, "Failed to edit the demand");
    }
  }

  public static async deleteDemand(id: string) {
    try {
      await DemandRepository.deleteDemand(+id);
      return new ControllerResponse(200, "");
    } catch (error) {
      logger.error(`Failed to delete the demand. Error: ${error}`);
      return new ControllerResponse(500, "Failed to delete the demand");
    }
  }

  public static async createDemand(body: CreateDemand, id: number) {
    try {
      let number_day = 0;
      const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

      if (body.endDate === body.startDate) {
        const start = new Date(body.startDate);
        body.endDate = new Date(start.getTime() + ONE_DAY_IN_MS);
      }

      if (body.startDate && body.endDate) {
        const start = new Date(body.startDate);
        const end = new Date(body.endDate);
        const differenceMs = end.getTime() - start.getTime();
        number_day = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
      }

      const userResponse: any = await UserService.getUserById(id);
      if (userResponse.code !== 200) {
        return new ControllerResponse(404, "User not found");
      }

      const user = userResponse.data;

      switch (body.type) {
        case DemandType.RTT: {
          if (user.rtt < number_day) {
            return new ControllerResponse(400, "Not enough RTT days");
          }
          user.rtt -= number_day;
          break;
        }
        case DemandType.CA: {
          if (user.ca < number_day) {
            return new ControllerResponse(400, "Not enough CA days");
          }
          user.ca -= number_day;
          break;
        }
        case DemandType.TT: {
          if (user.tt < number_day) {
            return new ControllerResponse(400, "Not enough TT days");
          }
          user.tt -= number_day;
          break;
        }
        default:
          return new ControllerResponse(400, "Invalid type");
      }

      const newDemand = new CreateDemand(
        body.startDate,
        body.endDate,
        body.motivation,
        "WAITING",
        body.type,
        number_day,
        id,
      );
      await UserService.updateUserDays(id, user.rtt, user.ca, user.tt);
      const demand: any = await DemandRepository.createDemand(newDemand);
      return new ControllerResponse(201, "", demand);
    } catch (error) {
      return new ControllerResponse(500, "Failed to create the demand");
    }
  }
}
