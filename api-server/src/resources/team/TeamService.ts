import { ControllerResponse } from "../../common/helper/ControllerResponse.js";
import { logger } from "../../common/helper/Logger.js";
import { TeamRepository } from "./TeamRepository.js";
import { Team } from "../../common/model/Team.js";
import { TeamDTO } from "./dto/TeamDTO.js";

export class TeamService {
  public static async getTeamByAgency(agencyId: number) {
    try {
      const teams: any = await TeamRepository.getTeamByAgencyId(agencyId);
      const teamsCount = await TeamRepository.getCountByAgencyId(agencyId);

      if (!teams) {
        return new ControllerResponse(401, "Teams doesn't exist");
      }

      const teamsDto: TeamDTO[] = teams.map((team: Team) => new TeamDTO(team));

      return new ControllerResponse(200, "", {
        totalData: teamsCount,
        list: teamsDto,
      });
    } catch (error) {
      logger.error(`Failed to get the departments. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get departments");
    }
  }
}
