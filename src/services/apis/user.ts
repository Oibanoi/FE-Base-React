import {
  IAdminCreateUserReq,
  IRegister,
  IUserDetail,
  IUserUpdate,
} from 'interfaces/user';
import { requestServices } from '../index';
import { getData } from 'helpers/request';

const { baseClient } = requestServices;

const register = (payload: IRegister): Promise<{ id: number }> => {
  return baseClient.post('/register', payload).then(getData);
};

const login = (
  username: string,
  password: string
): Promise<{ access_token: string }> => {
  return baseClient
    .post('/login', { username: username, password: password })
    .then(getData);
};

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getAccessToken = () => {
  return localStorage.getItem('token');
};

const getUserDetail = (user_id: number): Promise<IUserDetail> => {
  return baseClient.get(`/users/${user_id}`).then(getData);
};

const updateUser = (payload: IUserUpdate): Promise<{ id: number }> => {
  return baseClient.put('/users', payload).then(getData);
};

const updatePassword = (
  current_password: string,
  new_password: string
): Promise<{ id: number }> => {
  return baseClient
    .put('/users/password', {
      current_password: current_password,
      new_password: new_password,
    })
    .then(getData);
};

const getAll = (params: {
  role?: number;
  search_param?: string;
  status?: boolean;
}): Promise<IUserDetail[]> => {
  return baseClient
    .get('/users', {
      params,
    })
    .then(getData);
};

const adminCreateUser = (payload: IAdminCreateUserReq) => {
  return baseClient.post('/users/create', payload).then(getData);
};

const resetPassword = (user_id: number) => {
  return baseClient.put(`/users/${user_id}/reset_password`).then(getData);
};

export default {
  register,
  login,
  isLoggedIn,
  getAccessToken,
  logout,
  getUserDetail,
  updateUser,
  updatePassword,
  getAll,
  adminCreateUser,
  resetPassword,
};
