import { UserAddress } from "../../../common/model/Address.js";
import { RoleEnum } from "../../../common/enum/RoleEnum.js";
import { User } from "../../../common/model/User.js";

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
  roles: RoleEnum[];
  iban: string;
  bic: string;
  avatar_url: string;

  constructor(user: User, avatar_url?: string) {
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
    this.roles = user.roles;
    this.iban = user.iban;
    this.bic = user.bic;
    this.ca = user.ca;
    this.tt = user.tt;
    this.rtt = user.rtt;
    this.avatar_url = avatar_url || "";
  }
}
