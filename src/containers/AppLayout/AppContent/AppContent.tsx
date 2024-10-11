import { Layout } from 'antd';
import { IRoute } from 'interfaces';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const { Content } = Layout;

interface AppContentProps {
  filteredRoutes: IRoute[];
}

// const useMatchedRoutes = (routes: IRoute[]) => {
//   const location = useLocation();
//   const matchedRoutes = matchRoutes(routes as RouteObject[], location);
//   return matchedRoutes;
// };

const AppContent: React.FC<AppContentProps> = ({ filteredRoutes }) => {
  // const matchedRoutes = useMatchedRoutes(filteredRoutes);
  // const crumbs = filteredRoutes
  //   // Get all routes that contain the current one
  //   .filter((route) => {
  //     return matchedRoutes?.[0].route?.path?.includes(route.path);
  //   })
  //   // Swap out any dynamic routes with their param values
  //   // E.g. "/products/:id/foo-bar" will become "/products/1/foo-bar"
  //   .map(({ path, name }) => {
  //     const routeParams =
  //       matchedRoutes && !!matchedRoutes.length ? matchedRoutes[0].params : {};
  //     return {
  //       path: Object.keys(routeParams).length
  //         ? Object.keys(routeParams).reduce(
  //             (path, param) => path.replace(`:${param}`, routeParams[param]!),
  //             path
  //           )
  //         : path,
  //       breadcrumbName: name,
  //     };
  //   });

  return (
    <Content className="app-content">
      <Suspense>
        <Routes>
          {filteredRoutes.map(({ component: Component, ...rest }, index) => {
            return (
              <Route
                {...rest}
                key={index}
                element={
                  <>
                    {/* <AppBreadcrumb crumbs={crumbs} /> */}
                    <Component />
                  </>
                }
              />
            );
          })}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </Content>
  );
};

export default AppContent;
