import { DatabaseClient } from "../helper/DatabaseClient";
import { CreateAddress } from "../model/Address";

export class AddressRepository {
  private static pool = DatabaseClient.mysqlPool;

  public static async createAddress(address: CreateAddress) {
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
}
