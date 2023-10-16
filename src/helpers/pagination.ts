import { PaginationProps } from 'antd/lib/pagination';
import { IPaginationResp } from 'interfaces';
import { commonConstants } from 'constants/index';

const { DEFAULT_SIZE_CHANGER } = commonConstants;

const mapPagerApiToAntdPager = (pagerApi: IPaginationResp) => {
  const antdPager: PaginationProps = {
    ...DEFAULT_SIZE_CHANGER,
    total: pagerApi.total_items,
    current: pagerApi.current_page,
    pageSize: pagerApi.page_size,
  };
  return antdPager;
};

export default {
  mapPagerApiToAntdPager,
};
