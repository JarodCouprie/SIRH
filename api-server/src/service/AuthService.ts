import { Request } from "express";
import { UserRepository } from "../repository/UserRepository.js";
import { CreateUser, ResetUserPassword, User } from "../model/User.js";
import bcrypt from "bcrypt";
import { logger } from "../helper/Logger.js";
import { ControllerResponse } from "../helper/ControllerResponse.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateNewAccessToken,
} from "../helper/Token.js";
import { CustomRequest } from "../helper/CustomRequest.js";

export class AuthService {
  private static async checkUserPassword(
    req: Request,
  ): Promise<ControllerResponse<any> | User> {
    const { email, password } = req.body;
    const [user] = await Promise.all([UserRepository.getUserByEmail(email)]);
    if (!user) {
      const fakePassword = Date.now().toString();
      await bcrypt.hash(fakePassword, 10);
      return new ControllerResponse(
        401,
        "Utilisateur ou mot de passe incorrect",
      );
    }
    const [passwordMatch] = await Promise.all([
      bcrypt.compare(password, user.password),
    ]);
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

  public static async resetUserPassword(req: Request) {
    try {
      const { password, confirmPassword } = req.body;
      if (password === confirmPassword) {
        const id = (req as CustomRequest).token.userId;
        const hashedPassword = await bcrypt.hash(password, 10);
        const resetUserPassword = new ResetUserPassword(id, hashedPassword);
        await UserRepository.resetPassword(resetUserPassword);
        return new ControllerResponse(201, "Password reset successfully");
      }
      return new ControllerResponse(
        400,
        "The password and the confirm password doesn't match",
      );
    } catch (error) {
      logger.error(`Resetting password failed. Error: ${error}`);
      return new ControllerResponse(500, "Resetting password failed");
    }
  }
}
