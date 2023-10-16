import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { IRoute } from 'interfaces';
import { commonHooks } from 'hooks';
import logo from 'assets/images/2.jpeg';

const { Sider, Footer } = Layout;
const { SubMenu } = Menu;
const { useAppMenu } = commonHooks;

interface AppSiderProps {
  filteredNavigation: IRoute[];
}

const AppSider: React.FC<AppSiderProps> = props => {
  // Get selectedKey, openKey from route & pathname
  const { filteredNavigation } = props;
  const [visible, setVisible] = useState(true);

  const { selectedKey, openKey } = useAppMenu(filteredNavigation);

  const onClickToggle = () => {
    setVisible(!visible);
  };

  return (
    <Sider
      className={classNames({
        'app-sider': true,
        collapsed: !visible,
      })}
      trigger={null}
      collapsible
      collapsed={!visible}
      width={270}
    >
      <div className="app-logo">
        {/*<Link to="/">*/}
        {/*  <img src={logo} alt="logo" />*/}
        {/*</Link>*/}
        <div
          style={{ position: 'absolute', right: 30, top: visible ? 60 : 70 }}
        >
          {visible ? (
            <>
              <MenuFoldOutlined
                data-testid="menu-collapse-icon ml-base"
                className="app-icon"
                onClick={onClickToggle}
                style={{ color: '#fff' }}
              />
            </>
          ) : (
            <MenuUnfoldOutlined
              data-testid="menu-expand-icon"
              className="app-icon"
              onClick={onClickToggle}
              style={{ color: '#fff' }}
            />
          )}
        </div>
      </div>

      <Menu
        className="app-menu"
        theme="dark"
        mode="inline"
        defaultOpenKeys={[openKey]}
        selectedKeys={[selectedKey]}
      >
        {filteredNavigation.map(item => {
          if (!item.icon) return null;
          if (!item.children) {
            return (
              <Menu.Item key={item.path}>
                <Link to={item.path}>
                  <item.icon className="app-icon" />
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            );
          } else {
            const { children } = item;
            const childs = filteredNavigation.filter(
              child => children.includes(child.path) && !child.children
            );
            return (
              <SubMenu
                key={item.path}
                title={
                  <span>
                    <item.icon className="app-icon" />
                    <span>{item.name}</span>
                  </span>
                }
              >
                {childs.map(child => {
                  return (
                    <Menu.Item key={child.path}>
                      <Link to={child.path}>{child.name}</Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }
        })}
      </Menu>
    </Sider>
  );
};

export default AppSider;
