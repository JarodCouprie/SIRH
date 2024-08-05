export class CreateUserFormDataModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  nationality: string;
  country: string;
  street: string;
  streetNumber: string;
  zipcode: string;
  locality: string;
  iban: string;
  bic: string;
  roles: number[];

  constructor(
    firstname = "",
    lastname = "",
    email = "",
    password = "",
    confirmPassword = "",
    phone = "",
    nationality = "",
    country = "",
    street = "",
    streetNumber = "",
    zipcode = "",
    locality = "",
    iban = "",
    bic = "",
    roles: number[] = [],
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.phone = phone;
    this.nationality = nationality;
    this.country = country;
    this.street = street;
    this.streetNumber = streetNumber;
    this.zipcode = zipcode;
    this.locality = locality;
    this.iban = iban;
    this.bic = bic;
    this.roles = roles;
  }
}

export class CreateUserModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  nationality: string;
  country: string;
  address: CreateUserAddress;
  iban: string;
  bic: string;
  roles: number[];

  constructor(createUser: CreateUserFormDataModel) {
    this.firstname = createUser.firstname;
    this.lastname = createUser.lastname;
    this.email = createUser.email;
    this.password = createUser.password;
    this.phone = createUser.phone;
    this.nationality = createUser.nationality;
    this.country = createUser.country;
    this.address = new CreateUserAddress(createUser);
    this.iban = createUser.iban;
    this.bic = createUser.bic;
    this.roles = createUser.roles;
  }
}

class CreateUserAddress {
  street: string;
  streetNumber: string;
  zipcode: string;
  locality: string;

  constructor(createUserAddress: CreateUserFormDataModel) {
    this.street = createUserAddress.street;
    this.streetNumber = createUserAddress.streetNumber;
    this.zipcode = createUserAddress.zipcode;
    this.locality = createUserAddress.locality;
  }
}
