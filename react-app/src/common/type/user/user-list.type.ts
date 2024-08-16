import { AddressModel } from "@/models/Address.model.ts";

export type UserList = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: AddressModel;
  active: boolean;
  avatar_url: string;
};
