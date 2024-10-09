import { Layout } from 'antd';
import { commonHooks } from 'hooks';
import { IRoute } from 'interfaces';
import { useEffect, useState } from 'react';
import routes from 'routes';
import { userServices } from 'services';
import AppContent from './AppContent';
import AppHeader from './AppHeader';
import './AppLayout.scss';
import AppSider from './AppSider';

let autoCollapseSider = true;

const AppLayout: React.FC = () => {
  const { isTabletView } = commonHooks.useWindowDimensions();

  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const toggleSider = () => {
    autoCollapseSider = false;
    setSiderCollapsed((collapsed) => !collapsed);
  };

  useEffect(() => {
    if (autoCollapseSider) {
      setSiderCollapsed(isTabletView);
    }
  }, [isTabletView]);

  return (
    <Layout className="app-layout">
      {userServices.isLoggedIn() && (
        <AppSider
          filteredNavigation={routes as IRoute[]}
          collapsed={siderCollapsed}
        />
      )}
      <Layout>
        <AppHeader onClickSiderIcon={toggleSider} />
        <AppContent filteredRoutes={routes as IRoute[]} />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
