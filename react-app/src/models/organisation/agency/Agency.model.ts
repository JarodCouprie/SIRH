import { AddressModel } from "@/models/Address.model.js";

export class AgencyModel {
  id: number;
  label: string;
  address: AddressModel;

  constructor(
    id: number = 1,
    label: string = "",
    address: AddressModel = new AddressModel(),
  ) {
    this.id = id;
    this.label = label;
    this.address = address;
  }
}

export class AgencyList {
  id: number;
  label: string;
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;
  lat: string;
  lng: string;

  constructor(
    id: number,
    label: string,
    street: string,
    streetNumber: string,
    locality: string,
    zipcode: string,
    lat: string,
    lng: string,
  ) {
    this.id = id;
    this.label = label;
    this.street = street;
    this.streetNumber = streetNumber;
    this.locality = locality;
    this.zipcode = zipcode;
    this.lng = lng;
    this.lat = lat;
  }
}

export class AgencyCoord {
  id: number;
  label: string;
  lat: string;
  lng: string;

  constructor(id: number, label: string, lat: string, lng: string) {
    this.id = id;
    this.label = label;
    this.lat = lat;
    this.lng = lng;
  }
}
