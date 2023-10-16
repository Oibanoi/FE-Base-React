import React from 'react';
import { Layout } from 'antd';
import './AppFooter.scss';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer className={'footer'}>© huyvu 2023. All rights reserved. </Footer>
  );
};

export default AppFooter;
