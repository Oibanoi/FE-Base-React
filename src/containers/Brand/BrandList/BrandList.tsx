import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import BrandFilter from 'components/Brand/BrandFilter/BrandFilter';
import ContentBlock from 'components/shared/ContentBlock';
import AppContainer from 'containers/AppLayout/AppContainer';
import { t } from 'helpers/i18n';
import { brandHooks } from 'hooks';
import { IBrand } from 'interfaces';
import React from 'react';

const { useBrandData } = brandHooks;

const BrandList: React.FC = () => {
  const {
    brands,
    filters,
    setFilters,
    fetching,
    pagination,
    handleTableChange,
  } = useBrandData({ page: 1, pageSize: 10 });

  const columns: ColumnsType<IBrand> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 70,
    },
    {
      title: t('Name'),
      dataIndex: 'name',
    },
    {
      title: t('Code'),
      dataIndex: 'code',
    },
    {
      title: t('Status'),
      dataIndex: 'isActive',
      render: (isActive: IBrand['isActive']) =>
        isActive ? t('Active') : t('Inactive'),
    },
  ];

  return (
    <AppContainer title={t('Brands')}>
      <ContentBlock className="mb-base">
        <BrandFilter filters={filters} setFilters={setFilters} />
      </ContentBlock>
      <ContentBlock
        title={
          <span className="text-h3">
            {t('TotalRecords')}: {pagination.total || 0}
          </span>
        }
      >
        <Table
          bordered
          rowKey="id"
          columns={columns}
          loading={fetching}
          dataSource={brands}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </ContentBlock>
    </AppContainer>
  );
};

export default BrandList;
