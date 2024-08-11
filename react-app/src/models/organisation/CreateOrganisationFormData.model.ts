export class CreateOrganisationFormDataModel {
  label: string;
  street: string;
  streetNumber: string;
  city: string;
  zipcode: string;
  country: string;

  constructor(
    label: string = "",
    street: string = "",
    streetNumber: string = "",
    city: string = "",
    zipcode: string = "",
    country: string = "",
  ) {
    this.label = label;
    this.street = street;
    this.streetNumber = streetNumber;
    this.city = city;
    this.zipcode = zipcode;
    this.country = country;
  }
}
