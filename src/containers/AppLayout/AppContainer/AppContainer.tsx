import { Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

interface AppContainerProps {
  title: React.ReactNode;
  head?: React.ReactNode;
  className?: string;
}

const AppContainer: React.FC<React.PropsWithChildren<AppContainerProps>> = (
  props
) => {
  const { title, head, className, children } = props;

  return (
    <div className="app-container">
      <div className="app-container-head">
        <Title className="app-title" level={4}>
          {title}
        </Title>
        {head}
      </div>

      {children && (
        <div className={`app-container-body ${className ? className : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default AppContainer;
