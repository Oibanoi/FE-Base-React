import { useEffect, useState } from 'react';
import { PaginationProps } from 'antd/es/pagination';
import { commonConstants } from '../constants';
import { transactionServices } from '../services';
import {
  IGetTransactionsReq,
  ITransactionItem,
} from '../interfaces/transactions';
import { commonHelpers, paginationHelpers } from '../helpers';
import { AnyObject } from '../interfaces';
import { omit, pickBy } from 'lodash';
import { defaultPage } from '../constants/pagination';

const { countFilter } = commonHelpers;
const { DEFAULT_PARAMS, DEFAULT_SIZE_CHANGER } = commonConstants;
const { mapPagerApiToAntdPager } = paginationHelpers;

const useTransaction = () => {
  const [isGetTransactions, setIsGetTransactions] = useState<boolean>(false);

  const [transactions, setTransactions] = useState<ITransactionItem[]>([]);

  const [params, setParams] = useState<IGetTransactionsReq>(DEFAULT_PARAMS);
  const [paginationAnt, setPaginationAnt] = useState<PaginationProps>({
    ...DEFAULT_SIZE_CHANGER,
  });

  const getTransactions = async () => {
    try {
      setIsGetTransactions(true);
      const res = await transactionServices.getTransactions(params);
      if (res && res.items) {
        const { items, pagination } = res;
        setTransactions(items);
        const pager = mapPagerApiToAntdPager(pagination);
        setPaginationAnt(pager);
      }
    } finally {
      setIsGetTransactions(false);
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
    if (!!countFilter(omit(params, ['page', 'pageSize'])))
      getTransactions().then();
  }, [params]);

  return {
    isGetTransactions,
    getTransactions,
    transactions,
    handleTableChange,
    onSearch,
    paginationAnt,
  };
};

export default {
  useTransaction,
};
