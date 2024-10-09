import { Breadcrumb } from 'antd';
import { InternalRouteType } from 'antd/lib/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';

interface AppBreadcrumbProps {
  crumbs: InternalRouteType[];
}

const AppBreadcrumb: React.FC<AppBreadcrumbProps> = (props) => {
  const { crumbs } = props;

  const itemRender = (
    route: InternalRouteType,
    _: object,
    routes: InternalRouteType[]
  ) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path || '/404'}>{route.breadcrumbName}</Link>
    );
  };

  return (
    <Breadcrumb
      className="app-breadcrumb"
      itemRender={itemRender}
      items={crumbs}
    />
  );
};

export default AppBreadcrumb;
