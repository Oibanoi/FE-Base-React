import { Card, CardProps } from 'antd';
import React from 'react';
import './ContentBlock.scss';

export interface ContentBlockProps extends CardProps {
  /**
   * Has divider between title and body?
   */
  hasDivider?: boolean;
}

const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { className, hasDivider, children, ...rest } = props;

  return (
    <Card
      // className={classNames({
      //   'content-block': true,
      //   'has-divider': hasDivider,
      //   ...(className && { [className]: true }),
      // })}
      className={`content-block ${hasDivider ? 'has-divider' : ''} ${
        className ? className : ''
      }`}
      bordered={false}
      {...rest}
    >
      {children}
    </Card>
  );
};

export default ContentBlock;
