import { DatabaseClient } from "../../common/helper/DatabaseClient.js";
import { Address } from "../../common/model/Address.js";
import { CreateOrUpdateAddressDTO } from "./dto/CreateOrUpdateAddressDTO.js";

export class AddressRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async createAddress(address: CreateOrUpdateAddressDTO) {
    const [result] = await this.pool.query(
      `
          INSERT INTO address (street, streetNumber, locality, zipcode, lat, lng)
          VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        address.street,
        address.streetNumber,
        address.locality,
        address.zipcode,
        address.lat,
        address.lng,
      ],
    );
    return result;
  }

  public static async updateAddress(
    address: CreateOrUpdateAddressDTO | Address,
    id: number,
  ) {
    const [result] = await this.pool.query(
      `
          UPDATE address
          SET street       = ?,
              streetNumber = ?,
              locality     = ?,
              zipcode      = ?,
              lat          = ?,
              lng          = ?
          WHERE id = ?
      `,
      [
        address.street,
        address.streetNumber,
        address.locality,
        address.zipcode,
        address.lat,
        address.lng,
        id,
      ],
    );
    return result;
  }
}
