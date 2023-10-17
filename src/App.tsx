import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import './App.less';
import './App.scss';
import PrivateRoute from 'components/shared/PrivateRoute';
import AppLayout from 'containers/AppLayout';
import { browserHistory } from './helpers';
import Page403 from './containers/shared/Page403';
import Page404 from './containers/shared/Page404';

const App: React.FC = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/403" component={Page403} />
        <Route exact path="/404" component={Page404} />
        {/*<Route exact path="/500" component={Page500} />*/}
        {/*<Route exact path="/home" component={CreateShift} />*/}
        <PrivateRoute path="/" component={AppLayout} />
      </Switch>
    </Router>
  );
};

export default App;
