import { UserRepository } from "../repository/UserRepository";
import { CreateUser, User, UserDTO, UserListDTO } from "../model/User";
import { logger } from "../helper/Logger";
import { ControllerResponse } from "../helper/ControllerResponse";
import { Request } from "express";
import { add } from "winston";
import { AddressRepository } from "../repository/AddressRepository";
import { CreateAddress } from "../model/Address";
import { RoleEnum } from "../enum/RoleEnum";

export class UserService {
  public static async getUsers() {
    try {
      const users: any = await UserRepository.getUsers();
      const usersDto: UserDTO[] = users.map((user: User) => new UserDTO(user));
      return new ControllerResponse<UserDTO[]>(200, "", usersDto);
    } catch (error) {
      logger.error(`Failed to get users. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de récupérer la liste des utilisateurs",
      );
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
      const userList: any = await UserRepository.listUsers(limit, offset);
      return new ControllerResponse(200, "", {
        totalData: userCount,
        list: userList.map((user: User) => new UserListDTO(user)),
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
      const user: any = await UserRepository.getUserById(id);
      if (!user) {
        return new ControllerResponse(401, "L'utilisateur n'existe pas");
      }
      return new ControllerResponse<UserDTO>(200, "", new UserDTO(user));
    } catch (error) {
      logger.error(`Failed to get user. Error: ${error}`);
      return new ControllerResponse(500, "Impossible de créer l'utilisateur");
    }
  }

  public static async setNewRole(req: Request, id: number) {
    try {
      const newRole: RoleEnum = req.body.role;
      await UserRepository.setUserNewRole(newRole, id);

      const user: any = await UserRepository.getUserById(id);
      if (!user) {
        return new ControllerResponse(401, "L'utilisateur n'existe pas");
      }
      return new ControllerResponse<UserDTO>(200, "", new UserDTO(user));
    } catch (error) {
      logger.error(`Failed to set user role. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de modifier le rôle de l'utilisateur",
      );
    }
  }

  public static async createUser(req: Request) {
    try {
      const address = req.body.address;
      const streetNumber = address.streetNumber;
      const street = address.street;
      const locality = address.locality;
      const zipcode = address.zipcode;
      const addressInfosFetched = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${streetNumber}+${street}+${locality}+${zipcode}`,
      );
      const addressInfos = await addressInfosFetched.json();

      if (!addressInfos.features.length) {
        return new ControllerResponse(400, "Adresse invalide");
      }

      const longitude = addressInfos.features[0].geometry.coordinates[0];
      const latitude = addressInfos.features[0].geometry.coordinates[1];

      const newAddress = new CreateAddress(
        street,
        streetNumber,
        locality,
        zipcode,
        latitude,
        longitude,
      );

      const createdAddress = await AddressRepository.createAddress(newAddress);

      let userAddressId: number;

      if ("insertId" in createdAddress) {
        userAddressId = createdAddress.insertId;
      } else {
        return new ControllerResponse(
          400,
          "Impossible d'enregistrer l'adresse de l'utilisateur",
        );
      }

      const newUser = new CreateUser(
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.phone,
        userAddressId,
        req.body.nationality,
        req.body.country,
        req.body.iban,
        req.body.bic,
      );

      const createdUser = await UserRepository.createUser(newUser);

      if ("insertId" in createdUser) {
        return new ControllerResponse(201, "Utilisateur créé avec succès");
      } else {
        return new ControllerResponse(
          400,
          "Impossible d'enregistrer l'utilisateur",
        );
      }
    } catch (error) {
      logger.error(`Failed to create user. Error: ${error}`);
      return new ControllerResponse(500, "Impossible de créer l'utilisateur");
    }
  }
}
