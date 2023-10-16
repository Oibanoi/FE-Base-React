import { lazy } from 'react';

import {
  HomeOutlined,
  UnorderedListOutlined,
  DollarCircleOutlined,
  BarChartOutlined,
  EditOutlined,
  QrcodeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Chat } from 'containers/Chat/Chat';

// App pages
const Home = lazy(() => import('containers/Home'));
const Statistical = lazy(() => import('containers/Statistical'));
const RealEstateManagement = lazy(() =>
  import('../containers/RealEstate/RealEstateManagement')
);
const RealEstateDetail = lazy(() =>
  import('../containers/RealEstate/RealEstateDetail')
);
const TransactionManagement = lazy(() =>
  import('../containers/Transaction/TransactionManagement')
);
const ServicePack = lazy(() => import('../containers/ServicePack'));
const PostManagement = lazy(() => import('containers/Post/PostManagement'));
const PostDetail = lazy(() => import('containers/Post/PostDetail'));
const UserManagement = lazy(() => import('containers/User/UserManagement'));

/*
 * If route has children, it's a parent menu (not link to any pages)
 * You can change permissions to your IAM's permissions
 */
const routes = [
  // This is a menu/route which has no children (sub-menu)
  {
    exact: true,
    path: '/',
    name: 'Trang chủ',
    component: Home,
    icon: HomeOutlined,
  },
  {
    exact: true,
    path: '/statistical',
    name: 'Thống kê',
    icon: BarChartOutlined,
    component: Statistical,
  },

  {
    exact: true,
    path: '/user',
    name: 'Quản lý tài khoản',
    icon: UserOutlined,
    component: UserManagement,
  },

  {
    exact: true,
    path: '/real-estate',
    name: 'Quản lý bất động sản',
    icon: UnorderedListOutlined,
    component: RealEstateManagement,
  },
  {
    exact: true,
    path: '/real-estate/:id',
    name: 'Chi tiết bất động sản',
    component: RealEstateDetail,
  },

  {
    exact: true,
    path: '/post',
    name: 'Quản lý bài viết',
    icon: EditOutlined,
    component: PostManagement,
  },
  {
    exact: true,
    path: '/post/:id',
    name: 'Chi tiết bài viết',
    component: PostDetail,
  },

  {
    exact: true,
    path: '/transaction',
    name: 'Quản lý giao dịch ',
    icon: DollarCircleOutlined,
    component: TransactionManagement,
  },

  {
    exact: true,
    path: '/service-pack',
    name: 'Quản lý gói dịch vụ ',
    icon: QrcodeOutlined,
    component: ServicePack,
  },

  {
    exact: true,
    path: '/chat',
    name: 'Chat',
    // icon: QrcodeOutlined,
    component: Chat,
  },
];

export default routes;
