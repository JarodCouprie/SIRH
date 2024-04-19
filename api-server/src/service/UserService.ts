import { UserRepository } from "../repository/UserRepository";
import { User, UserDTO } from "../model/User";
import { logger } from "../helper/Logger";
import { ControllerResponse } from "../helper/ControllerResponse";

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
}
