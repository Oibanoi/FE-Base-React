import { AnyObject } from '../interfaces';

const countFilter = (filters?: AnyObject) => {
  return filters
    ? Object.values(filters).filter(item => String(item) === '0' || !!item)
        .length
    : 0;
};

export default {
  countFilter,
};
