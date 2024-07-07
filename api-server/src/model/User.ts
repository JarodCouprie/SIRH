import { RoleEnum } from "../enum/RoleEnum.js";
import { Address, UserAddress } from "./Address.js";

export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
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
  role: RoleEnum;
  iban: string;
  bic: string;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    password: string,
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
    role: RoleEnum,
    iban: string,
    bic: string,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.password = password;
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
    this.role = role;
    this.iban = iban;
    this.bic = bic;
  }
}

export class CreateUser {
  firstname: string;
  lastname: string;
  email: string;
  id_address: number;
  nationality: string;
  role: string;
  iban: string;
  country: string;
  phone: string;
  bic: string;

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
    role?: string,
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
    this.role = role || RoleEnum.USER;
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

export class UserDTO {
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
  address: UserAddress;
  country: string;
  nationality: string;
  role: RoleEnum;
  iban: string;
  bic: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.phone = user.phone;
    this.created_at = new Date(`${user.created_at} UTC`);
    this.active = user.active;
    this.address = new UserAddress(user);
    this.country = user.country;
    this.nationality = user.nationality;
    this.role = user.role;
    this.iban = user.iban;
    this.bic = user.bic;
    this.ca = user.ca;
    this.tt = user.tt;
    this.rtt = user.rtt;
  }
}

export class UserListDTO {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: UserAddress;
  active: boolean;
  ca: number;
  rtt: number;
  tt: number;

  constructor(user: User) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.phone = user.phone;
    this.address = new UserAddress(user);
    this.active = user.active;
    this.ca = user.ca;
    this.rtt = user.rtt;
    this.tt = user.tt;
  }
}
