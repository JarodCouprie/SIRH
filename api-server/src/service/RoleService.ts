import { ControllerResponse } from "../helper/ControllerResponse.js";
import { logger } from "../helper/Logger.js";
import { RoleRepository } from "../repository/RoleRepository.js";

export class RoleService {
  public static async getRoles() {
    try {
      const roles: any = await RoleRepository.getRoles();
      return new ControllerResponse(200, "", roles);
    } catch (error) {
      logger.error(`Failed to get users. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de récupérer la liste des rôles",
      );
    }
  }
}
