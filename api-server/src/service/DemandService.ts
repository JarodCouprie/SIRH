import {ControllerResponse}  from "../helper/ControllerResponse";
import { DemandRepository } from "../repository/DemandRepository";
import { Demand, DemandDTO } from "../model/Demand"
import {logger} from "../helper/Logger";

export class DemandService {

    public static async getDemand(){
        try{
            const demand: any = await DemandRepository.getDemand();
            const demandDto: DemandDTO[] = demand.map((demand: Demand) => new DemandDTO(demand));
            return new ControllerResponse<DemandDTO[]>(200,"Get all the demand",demandDto);
        }catch (error){
            logger.error(`Failed to get demand. Error: ${error}`);
            return new ControllerResponse(500, "Failed to get demand");
        }
    }

    public static async getDemandById(id: string){
        try {
            const demand: any = await DemandRepository.getDemandById(id);
            if (!demand){
                return new ControllerResponse(401, "Demand doesn't exist");
            }
            return new ControllerResponse(200, "Demand finded", demand);
        }catch (error){
            logger.error(`Failed to get the demand. Error: ${error}`);
            return new ControllerResponse(500, "Failed to get the demand");
        }
    }

    public static async editDemand(id:string){
        try {
            const demand: any = await DemandRepository.editDemand(id);
            if (!demand){
                return new ControllerResponse(401,"Demand doesn't exist");
            }
            return new ControllerResponse(200, "Demand change", demand);
        }catch (error){
            logger.error(`Failed to edit the demand. Error: ${error}`);
            return new ControllerResponse(500, "Failed to edit the demand");
        }
    }

    public static async deleteDemand(id: string){
        try{
            const demand: any = await.DemandRepository.deleteDemand(id);
            if (!demand){
                return new ControllerResponse(401,"Demand doesn't exist");
            }
            return new ControllerResponse(200, "Demand delete successfully", demand);
        }catch (error){
            logger.error(`Failed to delete the demand. Error: ${error}`);
            return new ControllerResponse(500, "Failed to delete the demand");
        }
    }

    public static async createDemand(){
        try {
            return new ControllerResponse(200, "Demand delete successfully");
        }catch (error){
            return new ControllerResponse(500, "Failed to delete the demand");
        }
    }
}