export class Agency {
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
    this.lat = lat;
    this.lng = lng;
  }
}

export class CreateAgency {
  label: string;
  id_address: number;

  constructor(label: string, id_address: number) {
    this.label = label;
    this.id_address = id_address;
  }
}
