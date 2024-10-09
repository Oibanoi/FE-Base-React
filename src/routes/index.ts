import { HomeOutlined } from '@ant-design/icons';
import { t } from 'helpers/i18n';
import { lazy } from 'react';

// App pages
const Home = lazy(() => import('containers/Home'));
// const BrandList = lazy(() => import('containers/Brand/BrandList'));
// const BrandCreate = lazy(() => import('containers/Brand/BrandCreate'));

const routes = [
  {
    path: '/',
    name: t('Home'),
    component: Home,
    icon: HomeOutlined,
  },
  // This is a parent menu which has children (sub-menu) and requires catalog:brand:X permission to display
  // X maybe read/create/update/delete...
  // {
  //   path: '/brands-root',
  //   name: t('BrandRoot'),
  //   // permissions: [permission(CATALOG, BRAND)],
  //   icon: AppstoreOutlined,
  //   children: ['/brands', '/brands/create'], // Specifies sub-menus/routes (sub-menu path)
  // },
  // // This is a sub-menu/route which requires catalog:brand:read permission to display/access
  // {
  //   exact: true,
  //   path: '/brands',
  //   name: t('BrandList'),
  //   component: BrandList,
  //   // permissions: [permission(CATALOG, BRAND, READ)],
  // },
  // // This is a sub-menu/route which requires catalog:brand:create permission to display/access
  // {
  //   exact: true,
  //   path: '/brands/create',
  //   name: t('BrandCreate'),
  //   component: BrandCreate,
  //   // permissions: [permission(CATALOG, BRAND, CREATE)],
  // },
];

export default routes;
