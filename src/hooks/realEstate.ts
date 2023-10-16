import { useEffect, useState } from 'react';
import {
  IGetRealEstateReq,
  IRealEstateItem,
  IUpsertRealEstate,
} from '../interfaces/realEstate';
import { realEstateServices } from '../services';
import { commonConstants } from '../constants';
import { commonHelpers, paginationHelpers } from '../helpers';
import { PaginationProps } from 'antd/es/pagination';
import { AnyObject } from '../interfaces';
import { omit, pickBy } from 'lodash';
import { defaultPage } from '../constants/pagination';

const { countFilter } = commonHelpers;
const { DEFAULT_PARAMS, DEFAULT_SIZE_CHANGER } = commonConstants;
const { mapPagerApiToAntdPager } = paginationHelpers;

const useRealEstate = () => {
  const [isUpsert, setIsUpsert] = useState<boolean>(false);
  const [isGetList, setIsGetList] = useState<boolean>(false);
  const [isGetDetail, setIsGetDetail] = useState<boolean>(true);

  const [params, setParams] = useState<IGetRealEstateReq>(DEFAULT_PARAMS);
  const [paginationAnt, setPaginationAnt] = useState<PaginationProps>({
    ...DEFAULT_SIZE_CHANGER,
  });

  const [realEstate, setRealEstate] = useState<IRealEstateItem>();
  const [realEstates, setRealEstates] = useState<IRealEstateItem[]>([]);

  const upsertRealEstate = async (payload: IUpsertRealEstate) => {
    try {
      setIsUpsert(true);
      await realEstateServices.upsert(payload);
    } finally {
      setIsUpsert(false);
    }
  };

  const getDetail = async (id: number) => {
    try {
      setIsGetDetail(true);
      const res = await realEstateServices.getDetail(id);
      if (res) {
        setRealEstate(res);
        return res;
      }
    } finally {
      setIsGetDetail(false);
    }
  };

  const getList = async () => {
    try {
      setIsGetList(true);
      const res = await realEstateServices.getRealEstates(params);
      if (res && res.items) {
        const { items, pagination } = res;
        setRealEstates(items);
        const pager = mapPagerApiToAntdPager(pagination);
        setPaginationAnt(pager);
      }
    } finally {
      setIsGetList(false);
    }
  };

  const handleTableChange = (pagination: PaginationProps) => {
    const newQueryParams = {
      ...params,
      page: pagination.current || params.page,
      page_size: pagination.pageSize || params.page_size,
    };
    setParams(newQueryParams);
  };

  const renderQuery = (values: AnyObject) => {
    return {
      ...pickBy(values, (e, _) => {
        return (
          e !== 0 &&
          e !== '' &&
          e !== undefined &&
          e !== null &&
          !(typeof e === 'object' && e.length === 0)
        );
      }),
    };
  };

  const onSearch = (values: AnyObject) => {
    const query = renderQuery(values);
    setParams({ ...query, page: defaultPage, page_size: params.page_size });
  };

  useEffect(() => {
    if (!!countFilter(omit(params, ['page', 'pageSize']))) getList().then();
  }, [params]);

  return {
    isUpsert,
    upsertRealEstate,
    isGetList,
    realEstates,
    getList,
    onSearch,
    params,
    handleTableChange,
    paginationAnt,
    isGetDetail,
    realEstate,
    getDetail,
    setIsGetDetail,
  };
};

export default {
  useRealEstate,
};
