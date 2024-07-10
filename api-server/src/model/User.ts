export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: Date;
  active: boolean;
  ca: number;
  tt: number;
  rtt: number;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    createdAt: Date,
    active: boolean,
    ca: number,
    tt: number,
    rtt: number,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
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

export class UserDTO {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: Date;
  active: boolean;
  ca: number;
  tt: number;
  rtt: number;

  constructor(user: User) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.active = user.active;
    this.ca = user.ca;
    this.rtt = user.rtt;
    this.tt = user.tt;
  }
}
