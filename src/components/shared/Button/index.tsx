import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonProps } from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { userServices } from '../../../services';

export const BackToHomeButton: React.FC<ButtonProps> = props => (
  <Link to="/">
    <Button type="primary" icon={<HomeOutlined />} {...props}>
      Trang chủ
    </Button>
  </Link>
);

export const LogoutButton: React.FC<ButtonProps> = props => (
  <Button
    icon={<LogoutOutlined />}
    onClick={() => userServices.logout()}
    {...props}
  >
    Đăng xuất
  </Button>
);
