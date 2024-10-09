import { notification } from 'antd';
import { ISignUpPayload } from 'interfaces/user';
import { useState } from 'react';
import { userServices } from 'services';
const useUser = () => {
  const [actionLoading, setActionLoading] = useState(false);
  const login = async (username: string, password: string) => {
    try {
      setActionLoading(true);
      const res = await userServices.login(username, password);
      if (res.accessToken) {
        const token = res.accessToken;
        localStorage.setItem('token', token);
      }
    } finally {
      setActionLoading(false);
    }
  };
  const signUp = async (payload: ISignUpPayload) => {
    try {
      setActionLoading(true);
      const res = await userServices.signUp(payload);
      if (res) {
        notification.success({
          message: 'Create user successfully',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Create user failed',
      });
    } finally {
      setActionLoading(false);
    }
  };
  return {
    login,
    signUp,
    actionLoading,
  };
};

export default {
  useUser,
};
