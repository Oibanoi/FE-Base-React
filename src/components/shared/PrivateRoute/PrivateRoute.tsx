import { Spin } from 'antd';
import { StoreContext } from 'contexts';
import { userHooks } from 'hooks';
import React from 'react';
import { userServices } from 'services';

type Props = {
  children?: React.ReactNode;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  // Check if user is logged in or not
  if (!userServices.isLoggedIn()) {
    userServices.logout();
    return null;
  }

  // Fetch global data
  const { user } = userHooks.useUser();
  if (!user) {
    return <Spin className="app-spin" />;
  }

  return (
    <StoreContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default PrivateRoute;
