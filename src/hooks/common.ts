import { browserHistory } from 'helpers';
import { IRoute } from 'interfaces';

const useAppMenu = (items: IRoute[]) => {
  const { location } = browserHistory;
  let selectedKey = location.pathname;
  const selectedKeySplitArr = location.pathname.split('/');
  let i = 1;
  let newSelectedKey = '';

  const getParentKey = (key: string): IRoute | undefined => {
    const newParentKey = items.find(
      item => item.children && item.children.includes(key)
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

export default {
  useAppMenu,
};
