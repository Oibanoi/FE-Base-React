import React from 'react';
import AppContainer from '../../AppLayout/AppContainer';
import SearchRealEstates from './SearchParams/SearchRealEstates';
import { useHistory } from 'react-router-dom';
import { realEstateHooks } from '../../../hooks';
import { getColumns } from './column';
import { Card, Table } from 'antd';

const RealEstateManagement: React.FC = () => {
  const history = useHistory();

  const {
    isGetList,
    realEstates,
    paginationAnt,
    handleTableChange,
    onSearch,
    getList,
  } = realEstateHooks.useRealEstate();

  const columns = getColumns({ history, getList });

  return (
    <AppContainer title={'Quản lý bất động sản'}>
      <SearchRealEstates getList={onSearch} isGetList={isGetList} />
      <Card className="mt-base">
        <div>Tổng số bản ghi: {paginationAnt.total}</div>
        <Table
          className="mt-base"
          columns={columns}
          dataSource={realEstates}
          loading={isGetList}
          rowKey="id"
          onChange={handleTableChange}
          pagination={paginationAnt}
        />
      </Card>
    </AppContainer>
  );
};

export default RealEstateManagement;
