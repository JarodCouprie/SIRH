import { RoleEnum } from "../enum/RoleEnum.js";

export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  created_at: Date;
  active: boolean;
  ca: number;
  tt: number;
  rtt: number;
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;
  lat: number;
  lng: number;
  country: string;
  nationality: string;
  roles: RoleEnum[];
  iban: string;
  bic: string;
  image_key: string;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    created_at: Date,
    active: boolean,
    ca: number,
    tt: number,
    rtt: number,
    street: string,
    streetNumber: string,
    locality: string,
    zipcode: string,
    lat: number,
    lng: number,
    country: string,
    nationality: string,
    roles: RoleEnum[],
    iban: string,
    bic: string,
    image_key: string,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
    this.active = active;
    this.ca = ca;
    this.tt = tt;
    this.rtt = rtt;
    this.street = street;
    this.streetNumber = streetNumber;
    this.locality = locality;
    this.zipcode = zipcode;
    this.lat = lat;
    this.lng = lng;
    this.country = country;
    this.nationality = nationality;
    this.roles = roles;
    this.iban = iban;
    this.bic = bic;
    this.image_key = image_key;
  }
}

export class CreateUser {
  firstname: string;
  lastname: string;
  email: string;
  id_address: number;
  nationality: string;
  roles: RoleEnum[];
  iban: string;
  country: string;
  phone: string;
  bic: string;
  image_key: string;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    id_address: number,
    nationality: string,
    country: string,
    iban: string,
    bic: string,
    image_key?: string,
    roles?: RoleEnum[],
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.id_address = id_address;
    this.nationality = nationality;
    this.country = country;
    this.iban = iban;
    this.bic = bic;
    this.image_key = image_key || "";
    this.roles = roles || [RoleEnum.USER];
  }
}

export class ResetUserPassword {
  id: number;
  password: string;

  constructor(id: number, password: string) {
    this.id = id;
    this.password = password;
  }
}
