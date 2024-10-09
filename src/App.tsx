import PrivateRoute from 'components/shared/PrivateRoute';
import initStaticFunctions from 'components/shared/staticFunctions';
import AppLayout from 'containers/AppLayout';
import Page403 from 'containers/shared/Page403';
import Page404 from 'containers/shared/Page404';
import Page500 from 'containers/shared/Page500';
import { browserHistory } from 'helpers';
import { useLayoutEffect, useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.scss';

function App() {
  initStaticFunctions();

  const [history, setHistory] = useState({
    action: browserHistory.action,
    location: browserHistory.location,
  });

  // useEffect(() => {
  //   TekoID.init({
  //     clientId: iam.clientId,
  //     scopes: IAM_SCOPES,
  //     oauthDomain: iam.oauthDomain,
  //   }).then(() => {
  //     // The initial phase is finish.
  //     // Now you can do your logic.
  //     setLoading(false);
  //   });
  // }, []);

  // trigger before UI is updated
  useLayoutEffect(() => browserHistory.listen(setHistory), []);

  return (
    <Router navigator={browserHistory} location={history.location}>
      <Routes>
        <Route path="403" element={<Page403 />} />
        <Route path="404" element={<Page404 />} />
        <Route path="500" element={<Page500 />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
