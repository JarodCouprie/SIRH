import { Agency } from "../../../model/Agency.js";
import { AgencyAddress } from "../../../model/Address.js";

export class AgencyList {
  id: number;
  label: string;
  address: AgencyAddress;

  constructor(agency: Agency) {
    this.id = agency.id;
    this.label = agency.label;
    this.address = new AgencyAddress(agency);
  }
}

export class AgencyDTO {
  id: number;
  label: string;
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;
  lat: string;
  lng: string;

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
  lat: string;
  lng: string;

  constructor(agency: Agency) {
    this.id = agency.id;
    this.label = agency.label;
    this.lat = agency.lat;
    this.lng = agency.lng;
  }
}
