import { Request } from "express";
import { UserRepository } from "../repository/UserRepository";
import { CreateUser, ResetUserPassword, User } from "../model/User";
import bcrypt from "bcrypt";
import { logger } from "../helper/Logger";
import { ControllerResponse } from "../helper/ControllerResponse";
import {
  generateAccessToken,
  generateRefreshToken,
  generateNewAccessToken,
} from "../helper/Token";

export class AuthService {
  public static async createUser(
    req: Request,
  ): Promise<ControllerResponse<any>> {
    try {
      const { firstname, lastname, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new CreateUser(firstname, lastname, email, hashedPassword);
      await UserRepository.createUser(user);
      return new ControllerResponse(201, "User registered successfully");
    } catch (error) {
      logger.error(`Registration failed. Error: ${error}`);
      return new ControllerResponse(500, "Registration failed");
    }
  }

  private static async checkUserPassword(
    req: Request,
  ): Promise<ControllerResponse<any> | User> {
    const { email, password } = req.body;
    const [user] = await Promise.all([UserRepository.getUserByEmail(email)]);
    if (!user) {
      return new ControllerResponse(401, "Utilisateur inconnu");
    }
    const [passwordMatch] = await Promise.all([
      bcrypt.compare(password, user.password),
    ]);
    if (!passwordMatch) {
      return new ControllerResponse(401, "Mot de passe incorrect");
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
      const accessToken = await generateNewAccessToken(req);
      if (accessToken instanceof ControllerResponse) {
        return accessToken;
      }
      return new ControllerResponse(200, "", { accessToken });
    } catch (error) {
      logger.error(`Login failed. Error: ${error}`);
      return new ControllerResponse(500, "Login failed");
    }
  }

  public static async resetUserPassword(req: Request) {
    try {
      const { password, confirmPassword } = req.body;
      if (password === confirmPassword) {
        // @ts-ignore
        const id = req.token.userId;
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
