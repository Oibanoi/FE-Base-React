import { browserHistory } from 'helpers';
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

const getAccessToken = () => {
  return localStorage.getItem('token');
};

const denyAccess = () => {
  browserHistory.push('/403');
};

export default {
  isLoggedIn,
  logout,
  getAccessToken,
  denyAccess,
};
