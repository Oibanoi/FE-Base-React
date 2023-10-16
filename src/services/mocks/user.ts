import { IUserDetail } from '../../interfaces/user';

const login = (
  username: string,
  password: string
): Promise<{ access_token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        access_token: 'a',
      });
    }, 1000);
  });
};

const getUserDetail = (user_id: number): Promise<IUserDetail> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        username: 'huyvu',
        full_name: 'Le Huy Vu',
        email: 'a@gmail.com',
        phone_number: '0363600390',
        avatar:
          'https://img.meta.com.vn/Data/image/2021/03/31/anh-trang-29.jpg',
        balance: 0,
        role: 2,
        is_active: true,
      });
    }, 1000);
  });
};

export default {
  login,
  getUserDetail,
};
