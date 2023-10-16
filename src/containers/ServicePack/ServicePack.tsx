import React, { useEffect } from 'react';
import AppContainer from '../AppLayout/AppContainer';
import SearchServicePacks from './SearchParams/SearchServicePacks';
import { Card, Table } from 'antd';
import { getColumns } from './column';
import { servicePackHooks } from '../../hooks';
import { commonConstants } from '../../constants';

const { DEFAULT_SIZE_CHANGER } = commonConstants;

const ServicePack: React.FC = () => {
  const columns = getColumns();

  const {
    isGetPacks,
    getAllPacks,
    servicePacks,
  } = servicePackHooks.useServicePack();

  useEffect(() => {
    getAllPacks().then();
  }, []);

  return (
    <AppContainer title={'Quản lý gói dịch vụ'}>
      <SearchServicePacks getList={getAllPacks} isGetList={isGetPacks} />
      <Card className="mt-base">
        <div>Tổng số bản ghi: {servicePacks.length}</div>
        <Table
          className="mt-base"
          columns={columns}
          dataSource={servicePacks}
          loading={isGetPacks}
          rowKey="id"
          pagination={DEFAULT_SIZE_CHANGER}
        />
      </Card>
    </AppContainer>
  );
};

export default ServicePack;
