import { User } from "./User.js";
import { Agency } from "./Agency.js";

export class UserAddress {
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;
  lat: number;
  lng: number;

  constructor(user: User) {
    this.street = user.street;
    this.streetNumber = user.streetNumber;
    this.locality = user.locality;
    this.zipcode = user.zipcode;
    this.lat = user.lat;
    this.lng = user.lng;
  }
}

export class AgencyAddress {
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;
  lat: string;
  lng: string;

  constructor(agency: Agency) {
    this.street = agency.street;
    this.streetNumber = agency.streetNumber;
    this.locality = agency.locality;
    this.zipcode = agency.zipcode;
    this.lat = agency.lat;
    this.lng = agency.lng;
  }
}
