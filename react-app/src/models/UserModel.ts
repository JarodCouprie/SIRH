export class UserModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  created_at: Date;
  active: boolean;
  ca: number;
  tt: number;
  rtt: number;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    created_at: Date,
    active: boolean,
    ca: number,
    tt: number,
    rtt: number,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.created_at = created_at;
    this.active = active;
    this.ca = ca;
    this.tt = tt;
    this.rtt = rtt;
  }
}

export class CreateUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
}

export class ResetUserPassword {
  id: number;
  password: string;

  constructor(id: number, password: string) {
    this.id = id;
    this.password = password;
  }
}

export type UserTokens = {
  accessToken: string;
  refreshToken: string;
};
