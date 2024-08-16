export class CreateOrUpdateAddressDTO {
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
