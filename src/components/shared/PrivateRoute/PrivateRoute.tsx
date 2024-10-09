import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  // Check if user is logged in or not
  // if (!userServices.isLoggedIn()) {
  //   userServices.login();
  //   return null;
  // }

  // Fetch global data
  // const { currentUser } = userHooks.useUserInfo();

  // Show spin when fetching required global data

  return <React.Fragment>{children}</React.Fragment>;
};

export default PrivateRoute;
