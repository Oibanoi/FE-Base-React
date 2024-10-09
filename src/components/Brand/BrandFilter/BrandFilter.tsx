import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { t } from 'helpers/i18n';
import { IBrandFilters } from 'interfaces';
import React from 'react';

const { Option } = Select;

interface BrandFilterProps {
  filters: IBrandFilters;
  setFilters: (filters: IBrandFilters) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = (props) => {
  const { filters, setFilters } = props;
  const [form] = Form.useForm();

  const onFinish = (values: IBrandFilters) => {
    const { query, isActive } = values;
    const newFilters = {
      page: 1,
      pageSize: filters.pageSize,
      ...(query && { query }),
      ...(isActive !== undefined && { isActive }),
    };
    setFilters(newFilters);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="query" className="mb-0">
            <Input
              autoFocus
              allowClear
              placeholder={t('EnterName')}
              data-testid="EnterName"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="isActive" className="mb-0">
            <Select
              placeholder={t('SelectStatus')}
              allowClear
              data-testid="SelectStatus"
            >
              <Option value={1}>{t('Active')}</Option>
              <Option value={0}>{t('Inactive')}</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            data-testid="Search"
          >
            {t('Search')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default BrandFilter;
