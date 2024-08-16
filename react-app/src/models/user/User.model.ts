import { AddressModel } from "@/models/Address.model.ts";
import { RoleEnum } from "@/common/enum/Role.enum.ts";

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
  roles: RoleEnum[];
  iban: string;
  bic: string;
  ca: number;
  tt: number;
  rtt: number;
  avatar_url: string;

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
    roles: RoleEnum[] = [RoleEnum.USER],
    iban: string = "",
    bic: string = "",
    ca: number = 0,
    tt: number = 0,
    rtt: number = 0,
    avatar_url: string = "",
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
    this.roles = roles;
    this.iban = iban;
    this.bic = bic;
    this.ca = ca;
    this.tt = tt;
    this.rtt = rtt;
    this.avatar_url = avatar_url;
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
