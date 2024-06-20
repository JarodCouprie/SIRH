import { UserRepository } from "../repository/UserRepository";
import { User, UserDTO } from "../model/User";
import { logger } from "../helper/Logger";
import { ControllerResponse } from "../helper/ControllerResponse";
import { Request } from "express";

export class UserService {
  public static async getUsers() {
    try {
      const users: any = await UserRepository.getUsers();
      const usersDto: UserDTO[] = users.map((user: User) => new UserDTO(user));
      return new ControllerResponse<UserDTO[]>(200, "", usersDto);
    } catch (error) {
      logger.error(`Failed to get users. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get users");
    }
  }

  public static async getUserList(req: Request) {
    try {
      const pageSize = req.query.pageSize || "0";
      const pageNumber = req.query.pageNumber || "10";
      const isPageSizeAnInteger = Number.isInteger(+pageSize);
      const isPageNumberAnInteger = Number.isInteger(+pageNumber);
      if (!isPageSizeAnInteger && !isPageNumberAnInteger) {
        return new ControllerResponse(400, "Les paramètres sont incorrects");
      }
      const limit = +pageSize;
      const offset = (+pageNumber - 1) * +pageSize;
      const userCount = await UserRepository.getUsersCount();
      const userList = await UserRepository.listUsers(limit, offset);
      return new ControllerResponse(200, "", {
        totalData: userCount,
        list: userList,
      });
    } catch (error) {
      logger.error(`Failed to get user list. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de récupérer la liste des utilisateurs",
      );
    }
  }

  public static async getUserById(id: number) {
    try {
      const user: any = await UserRepository.getUserById(+id);
      if (!user) {
        return new ControllerResponse(401, "User doesn't exist");
      }
      return new ControllerResponse<UserDTO>(200, "", new UserDTO(user));
    } catch (error) {
      logger.error(`Failed to get user. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get user");
    }
  }

  public static async updateUserDays(
    id: number,
    rtt: number,
    ca: number,
    tt: number,
  ) {
    try {
      const user = await UserRepository.getUserById(id);
      if (!user) {
        return new ControllerResponse(404, "User not found");
      }

      user.rtt = rtt;
      user.ca = ca;
      user.tt = tt;

      await UserRepository.updateUserDays(id, rtt, ca, tt);
      return new ControllerResponse(
        200,
        "User days updated",
        new UserDTO(user),
      );
    } catch (error) {
      logger.error(`Failed to update user days. Error: ${error}`);
      return new ControllerResponse(500, "Failed to update user days");
    }
  }
}
