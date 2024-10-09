import { browserHistory } from 'helpers';
import { getData } from 'helpers/request';
import { ILogin, ISignUpPayload, ISignUpResponse } from 'interfaces/user';
import { requestServices } from 'services';
const { baseClient } = requestServices;
const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  // return true;
  return !!token;
};

const logout = async () => {
  // Tracking - Reset userId when logged out
  await baseClient.post('/logout');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};
const login = (username: string, password: string): Promise<ILogin> => {
  return baseClient
    .post('/login', { username: username, password: password })
    .then(getData);
};
const signUp = (payload: ISignUpPayload): Promise<ISignUpResponse> => {
  return baseClient.post('/register', payload).then(getData);
};
const getAccessToken = () => {
  return localStorage.getItem('token');
};

const denyAccess = () => {
  browserHistory.push('/403');
};

export default {
  signUp,
  isLoggedIn,
  logout,
  login,
  getAccessToken,
  denyAccess,
};
