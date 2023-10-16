import React from 'react';
import AppContainer from '../../AppLayout/AppContainer';
import { Card, Table } from 'antd';
import SearchTransactions from './SearchParams/SearchTransactions';
import { transactionHooks } from '../../../hooks';
import { columns } from './column';

const TransactionManagement: React.FC = () => {
  const {
    isGetTransactions,
    transactions,
    paginationAnt,
    handleTableChange,
    onSearch,
  } = transactionHooks.useTransaction();

  return (
    <AppContainer title={'Quản lý giao dịch'}>
      <SearchTransactions getList={onSearch} isGetList={isGetTransactions} />
      <Card className="mt-base">
        <div>Tổng số bản ghi: {paginationAnt.total}</div>
        <Table
          className="mt-base"
          columns={columns}
          dataSource={transactions}
          loading={isGetTransactions}
          rowKey="id"
          onChange={handleTableChange}
          pagination={paginationAnt}
        />
      </Card>
    </AppContainer>
  );
};

export default TransactionManagement;
