export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  emailAddress: string;
}

export class FormValues {
  username: any;
  emailAddress: any;
  password: any;
  public constructor(init?: Partial<FormValues>) {
    Object.assign(this, init);
  }
}

export interface Token {
  token: string;
}
