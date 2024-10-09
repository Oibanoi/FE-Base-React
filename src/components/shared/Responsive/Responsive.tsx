import React from 'react';
import useMedia from 'use-media';

export interface ResponsiveProps {
  children?: React.ReactNode;
  mobile?: React.ReactNode;
  desktop?: React.ReactNode;
  useChildDefault?: boolean;
}
export const Responsive: React.FC<ResponsiveProps> = ({
  mobile,
  desktop,
  children,
  useChildDefault,
}) => {
  const isMobile = useMedia({ maxWidth: 767 });
  let device = 'desktop';
  if (isMobile) {
    device = 'mobile';
  }
  const defaultChild = useChildDefault ? children : null;
  switch (device) {
    case 'mobile':
      return mobile ?? defaultChild;
    case 'desktop':
      return desktop ?? defaultChild ?? children;
    default:
      return desktop ?? defaultChild;
  }
};
