import {ControllerResponse} from "../helper/ControllerResponse";
import {DemandRepository} from "../repository/DemandRepository";
import { Demand, } from "../model/Demand"
import {logger} from "../helper/Logger";
import {DemandDTO} from "../dto/demand/DemandDTO";
import {CreateDemand} from "../dto/demand/CreateDemandDTO";
import {EditDemandDTO} from "../dto/demand/EditDemandDTO";

export class DemandService {

    public static async getDemand() {
        try {
            const demand: any = await DemandRepository.getDemand();
            const demandDto: DemandDTO[] = demand.map((demand: Demand) => new DemandDTO(demand));
            return new ControllerResponse<DemandDTO[]>(200, "", demandDto);
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
            )
            await DemandRepository.editDemand(+id,editDemand);
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

    public static async createDemand(body: CreateDemand) {
        try {
            const newDemand = new CreateDemand(
                body.startDate,
                body.endDate,
                body.motivation,
                body.status,
                body.type,
                body.idOwner,
                body.idValidator
            )
            const demand: any = await DemandRepository.createDemand(newDemand);
            return new ControllerResponse(201, "", demand);
        } catch (error) {
            return new ControllerResponse(500, "Failed to create the demand");
        }
    }
}