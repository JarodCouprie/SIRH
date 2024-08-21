import { ControllerResponse } from "../../common/helper/ControllerResponse.js";
import { logger } from "../../common/helper/Logger.js";
import { TeamRepository } from "./TeamRepository.js";
import { CreateTeam, Team } from "../../common/model/Team.js";
import { TeamDTO, TeamsDTO } from "./dto/TeamDTO.js";
import { Request } from "express";
import { MinioClient } from "../../common/helper/MinioClient";
import { DepartmentRepository } from "../department/DepartmentRepository";

export class TeamService {
  public static async createTeam(req: Request) {
    try {
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

  public static async getTeamById(teamId: number) {
    try {
      const team: any = await TeamRepository.getTeamById(teamId);
      const teamPresence = await TeamRepository.countTeamById(teamId);
      if (!team) {
        return new ControllerResponse(401, "Team doesn't exist");
      }

      const members: any[] = [];
      for (const row of team) {
        if (row.id) {
          const memberAvatarUrl = await MinioClient.getSignedUrl(row.image_key);
          members.push({
            id_member: row.id,
            member_firstname: row.firstname,
            member_lastname: row.lastname,
            member_email: row.email,
            member_avatar: memberAvatarUrl,
            is_present: row.is_present,
          });
        }
      }

      const teamDto: TeamDTO = new TeamDTO(
        team[0],
        teamPresence[0].total_present,
        teamPresence[0].total_team,
        members,
      );

      return new ControllerResponse<TeamDTO>(200, "", teamDto);
    } catch (error) {
      logger.error(`Failed to get the team. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get Team");
    }
  }

  public static async getTeamByService(serviceId: number) {
    try {
      const teams: any = await TeamRepository.getTeamByService(serviceId);
      const teamsCount = await TeamRepository.getCountByService(serviceId);
      const teamPresence = await TeamRepository.countTeam(serviceId);

      if (!teams) {
        return new ControllerResponse(401, "Teams doesn't exist");
      }

      const teamsDto: TeamsDTO[] = teams.map(
        (team: Team) =>
          new TeamsDTO(
            team,
            teamPresence.find(
              (presence: any) => presence.id_team === team.id,
            ).total_present,
            teamPresence.find(
              (presence: any) => presence.id_team === team.id,
            ).total_team,
          ),
      );

      return new ControllerResponse(200, "", {
        totalData: teamsCount,
        list: teamsDto,
      });
    } catch (error) {
      logger.error(`Failed to get the teams. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get teams");
    }
  }

  public static async deleteTeam(teamId: number) {
    try {
      console.log(teamId);
      await TeamRepository.deleteTeam(+teamId);
      return new ControllerResponse(200, "");
    } catch (error) {
      logger.error(`Failed to delete the team. Error: ${error}`);
      return new ControllerResponse(500, "Failed to delete the team");
    }
  }
}
