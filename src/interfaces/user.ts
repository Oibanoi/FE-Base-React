export interface IRegister {
  full_name: string;
  phone_number: string;
  email: string;
  username: string;
  password: string;
}

export interface IUserDetail {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  avatar: string;
  balance: number;
  role: number;
  is_active: boolean;
}

export interface IUserUpdate {
  full_name?: string;
  phone_number?: string;
  email?: string;
  avatar?: string;
}

export interface IAdminCreateUserReq {
  username?: string;
  full_name?: string;
  phone_number?: string;
  email?: string;
  role?: number;
}
