import { ControllerResponse } from "../../common/helper/ControllerResponse.js";
import { logger } from "../../common/helper/Logger.js";
import { TeamRepository } from "./TeamRepository.js";
import { CreateTeam, Team } from "../../common/model/Team.js";
import { TeamDTO } from "./dto/TeamDTO.js";
import { Request } from "express";

export class TeamService {
  public static async createTeam(req: Request) {
    try {
      console.log(req);
      const { label, minimum_users, id_user_lead_team, id_service, members } =
        req.body;

      const newTeamRequest = new CreateTeam(
        label,
        minimum_users,
        id_user_lead_team,
        id_service,
        members,
      );

      const createdTeam = await TeamRepository.createTeam(newTeamRequest);

      let teamId: number;

      if ("insertId" in createdTeam) {
        teamId = createdTeam.insertId;
        if (members && members.length > 0) {
          for (const userId of members) {
            await TeamRepository.addMemberToTeam({
              id_team: teamId,
              id_user: userId,
            });
          }
        }
      }

      return new ControllerResponse(200, "Team created");
    } catch (error) {
      logger.error(`Failed to create the team. Error: ${error}`);
      return new ControllerResponse(500, "Failed to create Team");
    }
  }

  public static async getTeamByAgency(serviceId: number) {
    try {
      const teams: any = await TeamRepository.getTeamByService(serviceId);
      const teamsCount = await TeamRepository.getCountByService(serviceId);

      if (!teams) {
        return new ControllerResponse(401, "Teams doesn't exist");
      }

      const teamsDto: TeamDTO[] = teams.map((team: Team) => new TeamDTO(team));

      return new ControllerResponse(200, "", {
        totalData: teamsCount,
        list: teamsDto,
      });
    } catch (error) {
      logger.error(`Failed to get the teams. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get teams");
    }
  }
}
