import PrivateRoute from 'components/shared/PrivateRoute';
import AppLayout from 'containers/AppLayout';
import Login from 'containers/Login';
import Page403 from 'containers/shared/Page403';
import Page404 from 'containers/shared/Page404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="403" element={<Page403 />} />
        <Route path="404" element={<Page404 />} />
        <Route path="404" element={<Page404 />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
