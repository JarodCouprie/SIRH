import { Address } from "../../../common/model/Address.js";
import { User } from "../../../common/model/User.js";

export class UserListDTO {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: Address;
  active: boolean;
  avatar_url: string;

  constructor(user: User, avatar_url?: string) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.phone = user.phone;
    this.address = new Address(user);
    this.active = user.active;
    this.avatar_url = avatar_url || "";
  }
}
