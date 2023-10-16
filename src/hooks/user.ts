import { useState } from 'react';
import { IAdminCreateUserReq, IRegister, IUserDetail } from 'interfaces/user';
import { userServices } from '../services';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';

const useUser = () => {
  const history = useHistory();

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isGetUserDetail, setIsGetUserDetail] = useState<boolean>(false);
  const [isGetUsers, setIsGetUsers] = useState<boolean>(false);

  const [user, setUser] = useState<IUserDetail>();
  const [users, setUsers] = useState<IUserDetail[]>([]);

  const register = async (payload: IRegister) => {
    try {
      setIsRegister(true);
      const res = await userServices.register(payload);
      if (res) {
        notification.success({
          message: 'Thành công',
          description: 'Đăng ký tài khoản thành công',
        });
        history.push('/login');
      }
    } finally {
      setIsRegister(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setIsLogin(true);
      const res = await userServices.login(username, password);
      if (res.access_token) {
        const token = res.access_token;
        localStorage.setItem('token', token);
        const user = await userServices.getUserDetail(0);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
    } finally {
      setIsLogin(false);
    }
  };

  const getUserDetail = async (user_id: number) => {
    try {
      setIsGetUserDetail(true);
      const res = await userServices.getUserDetail(user_id);
      if (res) {
        setUser(res);
      }
    } finally {
      setIsGetUserDetail(false);
    }
  };

  const getAll = async (params: {
    role?: number;
    search_param?: string;
    status?: boolean;
  }) => {
    try {
      setIsGetUsers(true);
      const res = await userServices.getAll(params);
      if (res) {
        setUsers(res);
      }
    } finally {
      setIsGetUsers(false);
    }
  };

  return {
    isRegister,
    register,
    isLogin,
    login,
    user,
    getUserDetail,
    isGetUserDetail,
    isGetUsers,
    users,
    getAll,
  };
};

const useAdminUser = () => {
  const [loading, setLoading] = useState<boolean>();

  const createUser = async (payload: IAdminCreateUserReq) => {
    try {
      setLoading(true);
      await userServices.adminCreateUser(payload);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createUser,
  };
};

export default {
  useUser,
  useAdminUser,
};
