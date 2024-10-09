export interface ILogin {
  accessToken: string;
  tokenType: string;
}

export interface ISignUpPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface ISignUpResponse {
  fullName: string;
  email: string;
  id: number;
  role: string;
}
