import { UserRepository } from "./UserRepository.js";
import {
  CreateUser,
  ResetUserPassword,
  User,
} from "../../common/model/User.js";
import { logger } from "../../common/helper/Logger.js";
import { ControllerResponse } from "../../common/helper/ControllerResponse.js";
import { Request } from "express";
import { AddressRepository } from "../address/AddressRepository.js";
import { MinioClient } from "../../common/helper/MinioClient.js";
import dotenv from "dotenv";
import { CustomRequest } from "../../common/helper/CustomRequest.js";
import { UpdateUserInfoDTO } from "./dto/UpdateUserInfoDTO.js";
import { UserDTO } from "./dto/UserDTO.js";
import { UserListDTO } from "./dto/UserListDTO.js";
import { UserEntity } from "../../common/entity/user/user.entity.js";
import { CreateOrUpdateAddressDTO } from "../address/dto/CreateOrUpdateAddressDTO.js";
import { UpdateUserAddressDTO } from "./dto/UpdateUserAddressDTO.js";
import { UpdateUserBankInfosDTO } from "./dto/UpdateUserBankInfosDTO.js";
import bcrypt from "bcrypt";

dotenv.config();

export class UserService {
  public static async getUsers() {
    try {
      const users: any = await UserRepository.getUsers();
      const userListMapped: UserListDTO[] = await Promise.all(
        users.map(async (user: User) => {
          return await this.getUserDTO(user);
        }),
      );
      return new ControllerResponse(200, "", {
        list: userListMapped,
      });
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
      const userListMapped: UserListDTO[] = await Promise.all(
        userList.map(async (user: User) => {
          return await this.getUserDTO(user);
        }),
      );
      return new ControllerResponse(200, "", {
        totalData: userCount,
        list: userListMapped,
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
      const userToSend = await this.getUserDTO(user);
      return new ControllerResponse<UserDTO>(200, "", userToSend);
    } catch (error) {
      logger.error(`Failed to get user. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de récupérer l'utilisateur",
      );
    }
  }

  public static async setNewRole(req: Request, id: number) {
    try {
      const roles: number[] = req.body.roles;
      if (roles.length === 0) {
        return new ControllerResponse(400, "Nombre de rôle insuffisant");
      }
      await UserRepository.setUserNewRoles(roles, id);

      const user: any = await UserRepository.getUserById(id);
      if (!user) {
        return new ControllerResponse(401, "L'utilisateur n'existe pas");
      }
      const userToSend = await this.getUserDTO(user);
      return new ControllerResponse<UserDTO>(200, "Rôles modifiés", userToSend);
    } catch (error) {
      logger.error(`Failed to set user role. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de modifier le rôle de l'utilisateur",
      );
    }
  }

  public static async setUserActive(req: Request, id: number) {
    try {
      const currentUserId = (req as CustomRequest).token.userId;
      if (currentUserId === id) {
        return new ControllerResponse(
          400,
          "Impossible de vous désactiver vous même",
        );
      }
      const userActive: boolean = req.body.active || false;
      await UserRepository.setUserActive(userActive, id);
      const user: any = await UserRepository.getUserById(id);
      if (!user) {
        return new ControllerResponse(401, "L'utilisateur n'existe pas");
      }
      const userToSend = await this.getUserDTO(user);
      let message = "Utilisateur désactivé";
      if (user.active) {
        message = "Utilisateur réactivé";
      }
      return new ControllerResponse<UserDTO>(200, message, userToSend);
    } catch (error) {
      logger.error(`Failed to disable user role. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de désactiver l'utilisateur",
      );
    }
  }

  public static async createUser(req: Request) {
    try {
      if (req.body.roles.length === 0) {
        return new ControllerResponse(
          400,
          "Un utilisateur doit avoir au minimum un rôle",
        );
      }

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

      const newAddress = new CreateOrUpdateAddressDTO(
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

      const password = await bcrypt.hash(req.body.password, 10);

      const newUser = new CreateUser(
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        password,
        req.body.phone,
        userAddressId,
        req.body.nationality,
        req.body.country,
        req.body.iban,
        req.body.bic,
      );

      const createdUser = await UserRepository.createUser(newUser);

      if ("insertId" in createdUser) {
        const createdUserId = createdUser.insertId;
        await UserRepository.setUserNewRoles(req.body.roles, createdUserId);
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

  public static async updateUserDays(
    id: number,
    rtt: number,
    ca: number,
    tt: number,
  ) {
    try {
      const user = await UserRepository.getUserById(id);
      if (!user) {
        return new ControllerResponse(404, "Utilisateur non trouvé");
      }

      user.rtt = rtt;
      user.ca = ca;
      user.tt = tt;

      await UserRepository.updateUserDays(id, rtt, ca, tt);
      return new ControllerResponse(
        200,
        "Soldes de l'utilisateur modifiés",
        new UserDTO(user),
      );
    } catch (error) {
      logger.error(`Failed to update user days. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de modifier les soldes de l'utilisateur",
      );
    }
  }

  public static async setNewProfilePicture(req: Request, id: number) {
    try {
      const file = req.file;
      if (!file) {
        return new ControllerResponse(400, "Aucun fichier n'a été envoyé");
      }
      const key = `user/${id}/profile-picture/${file.originalname}`;
      await MinioClient.putObjectToBucket(key, file).then(async () => {
        await UserRepository.setUserNewProfilePicture(key, id);
      });
      const user: User = await UserRepository.getUserById(id);
      if (!user) {
        return new ControllerResponse(401, "L'utilisateur n'existe pas");
      }
      const userToSend = await this.getUserDTO(user);
      return new ControllerResponse<UserDTO>(200, "", userToSend);
    } catch (error) {
      logger.error(`Failed to set user role. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de modifier le rôle de l'utilisateur",
      );
    }
  }

  public static async updateUserInfos(req: Request, id: number) {
    try {
      const body: UpdateUserInfoDTO = req.body;
      await UserRepository.updateUserInfos(body, id);

      const user: User = await UserRepository.getUserById(id);
      if (!user) {
        return new ControllerResponse(401, "L'utilisateur n'existe pas");
      }
      const userToSend = await this.getUserDTO(user);
      return new ControllerResponse<UserDTO>(
        200,
        "Utilisateur modifié",
        userToSend,
      );
    } catch (error) {
      logger.error(`Failed to update user infos. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de modifier les informations de l'utilisateur",
      );
    }
  }

  public static async updateUserAddress(req: Request, id: number) {
    try {
      const body: UpdateUserAddressDTO = req.body;
      const userEntity: UserEntity = await UserRepository.getUserEntityById(id);

      const addressInfosFetched = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${body.streetNumber}+${body.street}+${body.locality}+${body.zipcode}`,
      );
      const addressInfos = await addressInfosFetched.json();

      if (!addressInfos.features.length) {
        return new ControllerResponse(400, "Adresse invalide");
      }

      const longitude = addressInfos.features[0].geometry.coordinates[0];
      const latitude = addressInfos.features[0].geometry.coordinates[1];

      const newAddress = new CreateOrUpdateAddressDTO(
        body.street,
        body.streetNumber,
        body.locality,
        body.zipcode,
        latitude,
        longitude,
      );

      await AddressRepository.updateAddress(newAddress, userEntity.id_address);
      await UserRepository.updateUserCountry(body.country, userEntity.id);

      const user: User = await UserRepository.getUserById(id);
      if (!user) {
        return new ControllerResponse(401, "L'utilisateur n'existe pas");
      }
      const userToSend = await this.getUserDTO(user);
      return new ControllerResponse<UserDTO>(
        200,
        "Adresse de l'utilisateur modifiée",
        userToSend,
      );
    } catch (error) {
      logger.error(`Failed to update user address. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de modifier l'adresse de l'utilisateur",
      );
    }
  }

  public static async updateUserBankInfos(req: Request, id: number) {
    try {
      const body: UpdateUserBankInfosDTO = req.body;
      await UserRepository.updateUserBankInfos(body, id);

      const user: User = await UserRepository.getUserById(id);
      if (!user) {
        return new ControllerResponse(401, "L'utilisateur n'existe pas");
      }
      const userToSend = await this.getUserDTO(user);
      return new ControllerResponse<UserDTO>(
        200,
        "Informations bancaires de l'utilisateur modifiées",
        userToSend,
      );
    } catch (error) {
      logger.error(`Failed to update user bank infos. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de modifier les informations bancaires de l'utilisateur",
      );
    }
  }

  public static async resetUserPassword(req: Request) {
    try {
      const { oldPassword, newPassword } = req.body;
      if (oldPassword === newPassword) {
        return new ControllerResponse(
          400,
          "Mot de passe identique au précédent",
        );
      }

      const id = (req as CustomRequest).token.userId;
      const user = await UserRepository.getUserEntityById(id);

      if (!user) {
        const fakePassword = Date.now().toString();
        await bcrypt.hash(fakePassword, 10);
        return new ControllerResponse(
          400,
          "Erreur lors de modification du mot de passe",
        );
      }

      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        return new ControllerResponse(
          400,
          "Erreur lors de modification du mot de passe",
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const resetUserPassword = new ResetUserPassword(user.id, hashedPassword);
      await UserRepository.resetPassword(resetUserPassword);

      return new ControllerResponse(201, "Mot de passe modifié avec succès");
    } catch (error) {
      logger.error(`Resetting password failed. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Échec de modification du mot de passe",
      );
    }
  }

  private static async getUserDTO(user: User): Promise<UserDTO> {
    let userToSend = new UserDTO(user);

    if (user.image_key) {
      const url = await MinioClient.getSignedUrl(user.image_key);
      userToSend = new UserDTO(user, url);
    }

    return userToSend;
  }
}
