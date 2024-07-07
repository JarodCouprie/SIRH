import { AddressModel } from "@/models/Address.model.ts";
import { RoleEnum } from "@/enum/Role.enum.ts";

export class UserModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  created_at: Date;
  address: AddressModel;
  active: boolean;
  country: string;
  nationality: string;
  role: RoleEnum;
  iban: string;
  bic: string;

  constructor(
    id: number = 0,
    firstname: string = "",
    lastname: string = "",
    email: string = "",
    phone: string = "",
    created_at: Date = new Date(),
    address: AddressModel = new AddressModel(),
    active: boolean = false,
    country: string = "",
    nationality: string = "",
    role: RoleEnum = RoleEnum.USER,
    iban: string = "",
    bic: string = "",
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
    this.address = address;
    this.active = active;
    this.country = country;
    this.nationality = nationality;
    this.role = role;
    this.iban = iban;
    this.bic = bic;
  }
}

export class UserListModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: AddressModel;
  active: boolean;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    address: AddressModel,
    active: boolean,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.active = active;
  }
}

export class ResetUserPassword {
  id: number;
  password: string;
  confirmPassword: string;

  constructor(id: number, password: string, confirmPassword: string) {
    this.id = id;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
