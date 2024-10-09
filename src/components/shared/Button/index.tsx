import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';
import { t } from 'helpers/i18n';
import React from 'react';
import { Link } from 'react-router-dom';
import { userServices } from 'services';

export const BackToHomeButton: React.FC<ButtonProps> = (props) => (
  <Link to="/">
    <Button type="primary" icon={<HomeOutlined />} {...props}>
      {t('BackToHome')}
    </Button>
  </Link>
);

export const LogoutButton: React.FC<ButtonProps> = (props) => (
  <Button icon={<LogoutOutlined />} onClick={userServices.logout} {...props}>
    {t('Logout')}
  </Button>
);
