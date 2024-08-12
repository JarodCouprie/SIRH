import { User } from "./User.js";

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
