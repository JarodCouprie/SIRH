import { User } from "./User.js";
import { Agency } from "./Agency.js";

export class Address {
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;
  lat: number;
  lng: number;

  constructor(entity: User | Agency) {
    this.street = entity.street;
    this.streetNumber = entity.streetNumber;
    this.locality = entity.locality;
    this.zipcode = entity.zipcode;
    this.lat = entity.lat;
    this.lng = entity.lng;
  }
}
