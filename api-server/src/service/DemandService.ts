import { ControllerResponse } from "../helper/ControllerResponse";
import { DemandRepository } from "../repository/DemandRepository";
import { Demand, DemandType } from "../model/Demand";
import { logger } from "../helper/Logger";
import { DemandDTO } from "../dto/demand/DemandDTO";
import { CreateDemand } from "../dto/demand/CreateDemandDTO";
import { EditDemandDTO } from "../dto/demand/EditDemandDTO";
import { Request } from "express";
import { UserService } from "./UserService";

export function calculateNumberOfDays(startDate: Date, endDate: Date): number {
  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const differenceMs = end.getTime() - start.getTime();
  return Math.ceil(differenceMs / ONE_DAY_IN_MS);
}

export function updateUserDays(
  user: any,
  type: DemandType,
  numberOfDays: number,
  isAddingDays: boolean = false,
) {
  switch (type) {
    case DemandType.RTT:
      if (isAddingDays) {
        user.rtt += numberOfDays;
      } else {
        if (user.rtt < numberOfDays) {
          return "Pas assez de jour de RTT";
        }
        user.rtt -= numberOfDays;
      }
      break;
    case DemandType.CA:
      if (isAddingDays) {
        user.ca += numberOfDays;
      } else {
        if (user.ca < numberOfDays) {
          return "Pas assez de jour de Congé";
        }
        user.ca -= numberOfDays;
      }
      break;
    case DemandType.TT:
      if (isAddingDays) {
        user.tt += numberOfDays;
      } else {
        if (user.tt < numberOfDays) {
          return "Pas assez de jour de Télétravail";
        }
        user.tt -= numberOfDays;
      }
      break;
    default:
      return "Invalid type";
  }
  return null;
}

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

  public static async editDemand(
    id: string,
    body: EditDemandDTO,
    userId: number,
  ) {
    try {
      const demand: any = await DemandRepository.getDemandById(+id);

      if (demand.status !== "DRAFT") {
        return new ControllerResponse(400, "Not allowed");
      }

      let number_day = 0;
      const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

      if (body.endDate === body.startDate) {
        const start = new Date(body.startDate);
        body.endDate = new Date(start.getTime() + ONE_DAY_IN_MS);
      }

      if (body.startDate && body.endDate) {
        number_day = calculateNumberOfDays(body.startDate, body.endDate);
      }

      const userResponse: any = await UserService.getUserById(userId);
      if (userResponse.code !== 200) {
        return new ControllerResponse(404, "User not found");
      }

      const user = userResponse.data;

      if (!demand) {
        return new ControllerResponse(401, "Demand doesn't exist");
      }

      const originalEndDate = demand.endDate;
      const originalNumberOfDays = calculateNumberOfDays(
        demand.startDate,
        originalEndDate,
      );
      const isReducingDays = new Date(body.endDate) < new Date(originalEndDate);

      if (isReducingDays) {
        const daysToRecover = originalNumberOfDays - number_day;
        updateUserDays(user, body.type, daysToRecover, true);
      } else {
        const daysToLose = number_day - originalNumberOfDays;
        const error = updateUserDays(user, body.type, daysToLose);
        if (error) {
          return new ControllerResponse(400, error);
        }
      }

      const editDemand = new EditDemandDTO(
        body.startDate,
        body.endDate,
        body.motivation,
        body.type,
        number_day,
        body.status,
      );

      await DemandRepository.editDemand(+id, editDemand);
      await UserService.updateUserDays(userId, user.rtt, user.ca, user.tt);

      return new ControllerResponse(200, "", editDemand);
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
        number_day = calculateNumberOfDays(body.startDate, body.endDate);
      }

      const userResponse: any = await UserService.getUserById(id);
      if (userResponse.code !== 200) {
        return new ControllerResponse(404, "User not found");
      }

      const user = userResponse.data;

      const error = updateUserDays(user, body.type, number_day);
      if (error) {
        return new ControllerResponse(400, error);
      }

      const newDemand = new CreateDemand(
        body.startDate,
        body.endDate,
        body.motivation,
        "DRAFT",
        body.type,
        number_day,
        id,
      );

      console.log(newDemand);

      await UserService.updateUserDays(id, user.rtt, user.ca, user.tt);
      const demand: any = await DemandRepository.createDemand(newDemand);
      return new ControllerResponse(201, "", demand);
    } catch (error) {
      return new ControllerResponse(500, "Failed to create the demand");
    }
  }
}

export default DemandService;
