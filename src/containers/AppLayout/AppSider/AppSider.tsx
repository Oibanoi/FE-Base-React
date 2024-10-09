import { Layout, Menu, MenuProps, MenuTheme } from 'antd';
import logo from 'assets/images/logo.png';
import { ThemeContext } from 'contexts';
import { commonHooks } from 'hooks';
import { IRoute } from 'interfaces';
import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

const { Sider, Footer } = Layout;

interface AppSiderProps {
  filteredNavigation: IRoute[];
  collapsed: boolean;
}

const AppSider: React.FC<AppSiderProps> = ({
  filteredNavigation,
  collapsed,
}) => {
  const { selectedKey, openKey } = commonHooks.useAppMenu(filteredNavigation);
  const { themeMode, colorPreset } = useContext(ThemeContext);

  const menuItems = useMemo<MenuProps['items']>(
    () =>
      filteredNavigation
        .map((item) => {
          if (!item.icon) return null;
          if (!item.children) {
            return {
              key: item.path,
              label: (
                <Link to={item.path}>
                  <item.icon
                    className="app-icon"
                    style={
                      selectedKey === item.path
                        ? { color: colorPreset.primary }
                        : undefined
                    }
                  />
                  <span>{item.name}</span>
                </Link>
              ),
            };
          }
          const { children } = item;
          const childs = filteredNavigation.filter(
            (child) => children.includes(child.path) && !child.children
          );
          return {
            key: item.path,
            label: (
              <span>
                <item.icon
                  className="app-icon"
                  style={
                    openKey === item.path
                      ? { color: colorPreset.primary }
                      : undefined
                  }
                />
                <span>{item.name}</span>
              </span>
            ),
            children: childs.map((child) => ({
              key: child.path,
              label: <Link to={child.path}>{child.name}</Link>,
            })),
          };
        })
        .filter((item) => item), // filter out nullable items
    [filteredNavigation, colorPreset]
  );

  return (
    <Sider
      className={collapsed ? 'app-sider collapsed' : 'app-sider'}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={270}
    >
      <div className="app-logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <Menu
        className="app-menu"
        theme={themeMode as MenuTheme}
        mode="inline"
        defaultOpenKeys={[openKey]}
        selectedKeys={[selectedKey]}
        items={menuItems}
      />

      {!collapsed && (
        <Footer className="app-footer">
          Base FE © {import.meta.env.VITE_APP_VERSION}
        </Footer>
      )}
    </Sider>
  );
};

export default AppSider;
