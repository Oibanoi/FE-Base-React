import {
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, MenuProps } from 'antd';
import { Responsive } from 'components/shared/Responsive/Responsive';
import { localizationConstants } from 'constants/index';
import AppSettings from 'containers/AppLayout/AppSettings';
import { StoreContext } from 'contexts';
import { localizationHelpers } from 'helpers';
import { t } from 'helpers/i18n';
import React, { useContext, useState } from 'react';
import { userServices } from 'services';

const { Header } = Layout;

const { REGIONS } = localizationConstants;
const { changeLanguage, getCurrentLanguage } = localizationHelpers;

const AppHeader: React.FC<{ onClickSiderIcon: () => void }> = ({
  onClickSiderIcon,
}) => {
  const { currentUser } = useContext(StoreContext);
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const userMenu: MenuProps['items'] = [
    {
      key: 'btn-settings',
      onClick: () => setToggleDrawer(true),
      icon: <SettingOutlined />,
      label: t('Settings'),
    },
    /**
     * Not destructuring logout func since spyOn not work on destructured import
     * Read this: https://github.com/mjackson/expect/issues/169
     */
    {
      key: 'btn-logout',
      onClick: userServices.logout,
      icon: <LogoutOutlined />,
      label: t('Logout'),
      /**
       * temporary ignore this field since Antd v5 dropdown component's menu item type
       * has not support data-* attributes yet(at the time created this boilerplate)
       * https://github.com/ant-design/ant-design/issues/39518
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'data-testid': 'logout-btn',
    },
  ];

  const localizationMenu: MenuProps['items'] = Object.values(REGIONS).map(
    (item) => ({
      key: item.key,
      onClick: () => changeLanguage(item.key),
      label: (
        <>
          <Avatar src={item.flag} shape="square" />
          <span style={{ marginLeft: 10 }}>{item.name}</span>
        </>
      ),
    })
  );

  const currentRegion = REGIONS[getCurrentLanguage()];

  return (
    <>
      <Header className="app-header">
        <div className="d-flex align-items-center">
          <MenuOutlined className="app-icon" onClick={onClickSiderIcon} />
        </div>
        <div>
          {/* Localization */}
          <Responsive
            mobile={
              <React.Fragment>
                <Dropdown
                  trigger={['click']}
                  menu={{ items: localizationMenu }}
                >
                  <span className="app-icon">
                    <Avatar src={currentRegion.flag} shape="square" />
                    <DownOutlined />
                  </span>
                </Dropdown>
                <Dropdown trigger={['click']} menu={{ items: userMenu }}>
                  <span className="app-user" data-testid="current-user-name">
                    <Avatar src={currentUser.picture} />
                    <DownOutlined />
                  </span>
                </Dropdown>
              </React.Fragment>
            }
          >
            <Dropdown trigger={['click']} menu={{ items: localizationMenu }}>
              <span className="app-user">
                <Avatar src={currentRegion.flag} shape="square" />
                <span className="label">{currentRegion.name}</span>
                <DownOutlined />
              </span>
            </Dropdown>
            {/* User info */}
            <Dropdown trigger={['click']} menu={{ items: userMenu }}>
              <span className="app-user" data-testid="current-user-name">
                <Avatar />
                <span className="label">{currentUser.name}</span>
                <DownOutlined />
              </span>
            </Dropdown>
          </Responsive>
        </div>
      </Header>
      {/* Theme setting drawer */}
      <AppSettings
        openSettings={toggleDrawer}
        setOpenSettings={setToggleDrawer}
      />
    </>
  );
};

export default AppHeader;
