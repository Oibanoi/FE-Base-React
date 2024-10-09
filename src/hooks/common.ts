import { commonConstants } from 'constants/index';
import { getWindowDimensions } from 'helpers/common';
import { IRoute } from 'interfaces';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useAppMenu = (items: IRoute[]) => {
  const currentLocation = useLocation();
  const { pathname } = currentLocation;
  let selectedKey = pathname;
  const selectedKeySplitArr = pathname.split('/');
  let i = 1;
  let newSelectedKey = '';

  const getParentKey = (key: string): IRoute | undefined => {
    const newParentKey = items.find(
      (item) => item.children && item.children.includes(key)
    );
    if (newParentKey) return newParentKey;
    else if (i < selectedKeySplitArr.length) {
      newSelectedKey += `/${selectedKeySplitArr[i++]}`;
      selectedKey = newSelectedKey;
      return getParentKey(selectedKey);
    }
  };

  const parentKey = getParentKey(selectedKey);
  const openKey = parentKey ? parentKey.path : '/';

  return { selectedKey, openKey };
};

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => setDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    ...dimensions,
    isTabletView: dimensions.width <= commonConstants.TABLET_WIDTH,
  };
};

export default { useAppMenu, useWindowDimensions };
