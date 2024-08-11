import { ControllerResponse } from "../helper/ControllerResponse.js";
import { CreateOrUpdateAddressDTO } from "../dto/address/CreateOrUpdateAddressDTO.js";
import { AddressRepository } from "../repository/AddressRepository.js";
import { Request } from "express";
import { CreateAgency } from "../model/Organisation.js";
import { logger } from "../helper/Logger.js";
import { AgencyRepository } from "../repository/AgencyRepository.js";

export class OrganisationService {
  public static async createAgency(req: Request) {
    try {
      console.log(req);
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
}
