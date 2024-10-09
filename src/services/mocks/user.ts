export const currentUser = {
  sub: 'a160863da1644a119382cfc3e8685a7c',
  name: 'User',
  email: 'user@gmail.com',
  phone_number: '0852161778',
  address: '',
  birthday: '',
  meta_data: {
    seller_id: '1,2',
    sso_id: 70024,
    addr_code: '01',
    department: 'COD',
    role: 'staff',
    title: 'Developer',
    asia_id: null,
    asia_username: null,
    manager_id: 50415,
    manager_asia_id: null,
    date_created: '2017-04-18 07:52:21',
    date_modified: '2017-08-02 08:51:22',
  },
  updated_at: '2017-08-02 08:51:22',
  tenant_id: '3',
};

const isLoggedIn = () => true;
const login = () => {};
const logout = () => {};
const getAccessToken = () => '1';
const getUserInfo = () => currentUser;
const getFullUserInfo = () => Promise.resolve(currentUser);
const denyAccess = () => {};

export default {
  isLoggedIn,
  login,
  logout,
  getAccessToken,
  getUserInfo,
  getFullUserInfo,
  denyAccess,
};
