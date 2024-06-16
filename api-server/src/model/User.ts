import { RoleEnum } from "../enum/RoleEnum";

export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: Date;
  active: boolean;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    createdAt: Date,
    active: boolean,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.active = active;
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
  createdAt: Date;
  active: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.active = user.active;
  }
}
