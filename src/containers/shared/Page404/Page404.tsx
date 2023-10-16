import React from 'react';
import { Result } from 'antd';
import {
  BackToHomeButton,
  LogoutButton,
} from '../../../components/shared/Button';

const Page404: React.FC = () => {
  return (
    <Result
      className="app-result-page"
      status="404"
      title="404"
      subTitle={'Không tìm thấy trang'}
      extra={
        <>
          <BackToHomeButton className="mr-half" />
          <LogoutButton />
        </>
      }
    />
  );
};

export default Page404;
