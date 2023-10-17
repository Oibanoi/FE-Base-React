import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Avatar, Button, Dropdown, Layout, Menu, Space, Tag } from 'antd';
import {
  DownOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import './AppHeader.scss';

const { Header } = Layout;
// const { userRole } = userConstants;

const AppHeader: React.FC = () => {
  const history = useHistory();

  // const [currentUser, setCurrentUser] = useState<IUserDetail>();

  // const onLogout = () => {
  //   userServices.logout().then(_ => history.push('/'));
  // };

  // useEffect(() => {
  //   const userInfo = localStorage.getItem('user');
  //   if (userInfo) {
  //     setCurrentUser(JSON.parse(userInfo));
  //   } else {
  //     setCurrentUser(undefined);
  //   }
  // }, [localStorage.getItem('token')]);

  const userMenu = (
    <Menu>
      <Menu.Item data-testid="btn-logout" key="btn-logout">
        <LogoutOutlined />
        <span style={{ marginLeft: 10 }}>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="app-header">
      <div className="d-flex align-items-center"></div>
      {/* <div>
        <Space>
          <>
            <Dropdown overlay={userMenu} trigger={['click']}>
              <span className="app-user">
                <Avatar src={currentUser?.avatar} />
                <span className="label">
                  {currentUser?.full_name}
                  <Tag color="green">
                    {userRole[currentUser?.role ? currentUser.role : 1]}
                  </Tag>
                </span>
                <DownOutlined />
              </span>
            </Dropdown>
          </>
        </Space>
      </div> */}
    </Header>
  );
};

export default AppHeader;
