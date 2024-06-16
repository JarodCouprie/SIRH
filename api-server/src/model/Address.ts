export class Address {
  id: number;
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;
  lat: number;
  lng: number;

  constructor(
    id: number,
    street: string,
    streetNumber: string,
    locality: string,
    zipcode: string,
    lat: number,
    lng: number,
  ) {
    this.id = id;
    this.street = street;
    this.streetNumber = streetNumber;
    this.locality = locality;
    this.zipcode = zipcode;
    this.lat = lat;
    this.lng = lng;
  }
}

export class CreateAddress {
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;
  lat: number;
  lng: number;

  constructor(
    street: string,
    streetNumber: string,
    locality: string,
    zipcode: string,
    lat: number,
    lng: number,
  ) {
    this.street = street;
    this.streetNumber = streetNumber;
    this.locality = locality;
    this.zipcode = zipcode;
    this.lat = lat;
    this.lng = lng;
  }
}
