import { Request } from "express";
import { UserRepository } from "../user/UserRepository.js";
import { User } from "../../common/model/User.js";
import bcrypt from "bcrypt";
import { logger } from "../../common/helper/Logger.js";
import { ControllerResponse } from "../../common/helper/ControllerResponse.js";
import {
  generateAccessToken,
  generateNewAccessToken,
  generateRefreshToken,
} from "../../common/helper/Token.js";

export class AuthService {
  private static async checkUserPassword(
    req: Request,
  ): Promise<ControllerResponse<any> | User> {
    const { email, password } = req.body;
    const user = await UserRepository.getUserByEmail(email);
    if (!user) {
      const fakePassword = Date.now().toString();
      await bcrypt.hash(fakePassword, 10);
      return new ControllerResponse(
        401,
        "Utilisateur ou mot de passe incorrect",
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return new ControllerResponse(
        401,
        "Utilisateur ou mot de passe incorrect",
      );
    }
    return user;
  }

  public static async loginUser(req: Request) {
    try {
      const user = await this.checkUserPassword(req);
      if (user instanceof ControllerResponse) {
        return user;
      }
      if (!user.active) {
        return new ControllerResponse(500, "Échec de connexion");
      }
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      return new ControllerResponse(200, "", { accessToken, refreshToken });
    } catch (error) {
      logger.error(`Login failed. Error: ${error}`);
      return new ControllerResponse(500, "Échec de connexion");
    }
  }

  public static async refreshToken(req: Request) {
    try {
      const tokens = await generateNewAccessToken(req);
      if (tokens instanceof ControllerResponse) {
        return tokens;
      }
      return new ControllerResponse(200, "", tokens);
    } catch (error) {
      logger.error(`Login failed. Error: ${error}`);
      return new ControllerResponse(500, "Login failed");
    }
  }
}
