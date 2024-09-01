import { Agency } from "../../../common/model/Agency.js";
import { Address } from "../../../common/model/Address";

export class AgencyList {
  id: number;
  label: string;
  address: Address;

  constructor(agency: Agency) {
    this.id = agency.id;
    this.label = agency.label;
    this.address = new Address(agency);
  }
}

export class AgencyDTO {
  id: number;
  label: string;
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;
  lat: number;
  lng: number;

  constructor(agency: Agency) {
    this.id = agency.id;
    this.label = agency.label;
    this.street = agency.street;
    this.streetNumber = agency.streetNumber;
    this.locality = agency.locality;
    this.zipcode = agency.zipcode;
    this.lat = agency.lat;
    this.lng = agency.lng;
  }
}

export class AgencyCoord {
  id: number;
  label: string;
  lat: number;
  lng: number;

  constructor(agency: Agency) {
    this.id = agency.id;
    this.label = agency.label;
    this.lat = agency.lat;
    this.lng = agency.lng;
  }
}
