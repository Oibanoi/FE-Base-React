import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IRoute } from '../../../interfaces';

const PrivateRoute = ({
  component: Component,
  ...rest
}: Omit<IRoute, 'name'>) => {
  // if (!userServices.isLoggedIn()) {
  //   return <Redirect to={'/login'} />;
  // } else {
  //   const userInfo = localStorage.getItem('user');
  //   if (userInfo) {
  //     const user = JSON.parse(userInfo);
  //     if (user.role === 1) {
  //       return <Redirect to={'/403'} />;
  //     }
  //   } else {
  //     return <Redirect to={'/403'} />;
  //   }
  // }

  return (
    <Route {...rest} render={routeProps => <Component {...routeProps} />} />
  );
};

export default PrivateRoute;
