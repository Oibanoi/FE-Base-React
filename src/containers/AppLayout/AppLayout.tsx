import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import routes from 'routes';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import './AppLayout.scss';
import { IRoute } from '../../interfaces';
import AppSider from './AppSider';
// import { userServices } from '../../services';

/**
 * This container is for lifting-up the `AppContent` to the parent node,
 * so we can avoid unnecessary re-calculation when resizing window
 * */
const AppLayoutContainer: React.FC<{
  children: React.ReactNode;
  filteredNavigation: IRoute[];
}> = ({ children, filteredNavigation }) => {
  return (
    <Layout className="app-layout">
      {/*{localStorage.getItem('token') && (*/}
      {/*  <AppSider filteredNavigation={filteredNavigation} />*/}
      {/*)}*/}
      {/* {userServices.isLoggedIn() && (
      )} */}
      <AppSider filteredNavigation={filteredNavigation} />
      <Layout>
        <AppHeader />
        {children}
        {/*<AppFooter />*/}
      </Layout>
    </Layout>
  );
};

const AppLayout: React.FC = () => {
  return (
    <AppLayoutContainer filteredNavigation={routes as IRoute[]}>
      <AppContent filteredRoutes={routes as IRoute[]} />
    </AppLayoutContainer>
  );
};

export default AppLayout;
