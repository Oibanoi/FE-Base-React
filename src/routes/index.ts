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
];

export default routes;
