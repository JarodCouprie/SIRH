import { ControllerResponse } from "../helper/ControllerResponse.js";
import { CreateOrUpdateAddressDTO } from "../dto/address/CreateOrUpdateAddressDTO.js";
import { AddressRepository } from "../repository/AddressRepository.js";
import { Request } from "express";
import { Agency, CreateAgency } from "../model/Agency.js";
import { logger } from "../helper/Logger.js";
import { AgencyRepository } from "../repository/AgencyRepository.js";
import {
  AgencyCoord,
  AgencyDTO,
  AgencyList,
} from "../dto/organisation/Agency/AgencyDTO.js";
import { AgencyEntity } from "../entity/agency/agency.entity.js";

export class AgencyService {
  public static async getAgency(req: Request) {
    try {
      const pageSize = req.query.pageSize || "0";
      const pageNumber = req.query.pageNumber || "10";
      const limit = +pageSize;
      const offset = (+pageNumber - 1) * +pageSize;

      let agencyCount = await AgencyRepository.getAgencyCount();
      const agency: any = await AgencyRepository.getAgency(limit, offset);

      const agencyDto: AgencyDTO[] = agency.map(
        (agency: Agency) => new AgencyDTO(agency),
      );

      return new ControllerResponse(200, "", {
        totalData: agencyCount,
        list: agencyDto,
      });
    } catch (error) {
      logger.error(`Failed to get agency. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get demand");
    }
  }

  public static async getAgencyById(id: number) {
    try {
      const agency: any = await AgencyRepository.getAgencyById(id);
      if (!agency) {
        return new ControllerResponse(401, "L'agence n'existe pas");
      }
      const agencyToSend = new AgencyList(agency);
      return new ControllerResponse<AgencyList>(200, "", agencyToSend);
    } catch (error) {
      logger.error(`Failed to get agency. Error: ${error}`);
      return new ControllerResponse(500, "Impossible de récupérer l'agence");
    }
  }

  public static async getAgencyCoord(req: Request) {
    try {
      const agency: any = await AgencyRepository.getAgencyCoord();
      const agencyDto: AgencyCoord[] = agency.map(
        (agency: Agency) => new AgencyCoord(agency),
      );
      return new ControllerResponse(200, "", agencyDto);
    } catch (error) {
      logger.error(`Failed to get agency. Error: ${error}`);
      return new ControllerResponse(500, "Failed to get demand");
    }
  }

  public static async createAgency(req: Request) {
    try {
      const streetNumber = req.body.streetNumber;
      const street = req.body.street;
      const locality = req.body.city;
      const zipcode = req.body.zipcode;

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

      let agencyAddressId: number;

      if ("insertId" in createdAddress) {
        agencyAddressId = createdAddress.insertId;
      } else {
        return new ControllerResponse(
          400,
          "Impossible d'enregistrer l'adresse de l'agence",
        );
      }
      const newAgency = new CreateAgency(req.body.label, agencyAddressId);

      const createdAgency = await AgencyRepository.createAgency(newAgency);
      return new ControllerResponse(
        201,
        "Agence créé avec succès",
        createdAgency,
      );
    } catch (error) {
      logger.error(`Failed to create user. Error: ${error}`);
      return new ControllerResponse(500, "Impossible de créer l'utilisateur");
    }
  }

  public static async updateAgenceInfos(req: Request, id: number) {
    try {
      const body: AgencyDTO = req.body;
      const agencyEntity: AgencyEntity =
        await AgencyRepository.getAgencyEntityById(id);

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

      await AddressRepository.updateAddress(
        newAddress,
        agencyEntity.id_address,
      );

      const agency: Agency = await AgencyRepository.getAgencyById(id);
      if (!agency) {
        return new ControllerResponse(401, "L'agence n'existe pas");
      }
      const agencyToSend = new AgencyList(agency);

      return new ControllerResponse<AgencyList>(
        200,
        "Adresse de l'agence modifiée",
        agencyToSend,
      );
    } catch (error) {
      logger.error(`Failed to update user address. Error: ${error}`);
      return new ControllerResponse(
        500,
        "Impossible de modifier l'adresse de l'utilisateur",
      );
    }
  }
}
