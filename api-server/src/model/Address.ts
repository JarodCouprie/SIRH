import { User } from "./User.js";

export class Address {
  id: number;
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;
  lat: number;
  lng: number;

  constructor(
    id: number,
    street: string,
    streetNumber: string,
    locality: string,
    zipcode: string,
    lat: number,
    lng: number,
  ) {
    this.id = id;
    this.street = street;
    this.streetNumber = streetNumber;
    this.locality = locality;
    this.zipcode = zipcode;
    this.lat = lat;
    this.lng = lng;
  }
}

export class CreateAddress {
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;
  lat: number;
  lng: number;

  constructor(
    street: string,
    streetNumber: string,
    locality: string,
    zipcode: string,
    lat: number,
    lng: number,
  ) {
    this.street = street;
    this.streetNumber = streetNumber;
    this.locality = locality;
    this.zipcode = zipcode;
    this.lat = lat;
    this.lng = lng;
  }
}

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
