import { Button, Card, Col, Form, Row, Select, Spin } from 'antd';
import { realEstateConstants } from '../../../../constants';
import React, { useEffect } from 'react';
import { locationHooks, servicePackHooks, userHooks } from '../../../../hooks';
import SearchAddress from '../../../../components/shared/SearchAddress';

const { Item } = Form;
const { REAL_ESTATE_TYPE } = realEstateConstants;
const SearchRealEstates = ({
  getList,
  isGetList,
}: {
  getList: (params: any) => void;
  isGetList: boolean;
}) => {
  const [form] = Form.useForm();

  const { isGetLocation, getLocation, location } = locationHooks.useLocation();
  const {
    isGetPacks,
    servicePacks,
    getAllPacks,
  } = servicePackHooks.useServicePack();
  const { isGetUsers, users, getAll } = userHooks.useUser();

  useEffect(() => {
    getAll({ role: 1 }).then();
    getLocation().then();
    getAllPacks().then();
  }, []);

  return isGetPacks && isGetLocation && isGetUsers ? (
    <Spin className="app-spin" />
  ) : (
    <Card style={{ boxShadow: '5px 8px 24px 5px #dcdedc' }}>
      <Form
        layout={'vertical'}
        form={form}
        onFinish={getList}
        initialValues={{
          transaction_type: 0,
          type: 0,
          status: 0,
        }}
      >
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <Item name={'user_id'} label={'Người đăng'}>
              <Select placeholder={'Người đăng'} allowClear>
                {users.map(user => (
                  <Select.Option key={user.id} value={user.id}>
                    {user.full_name} - {user.email}
                  </Select.Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span={6}>
            <Item name={'transaction_type'} label={'Loại giao dịch'}>
              <Select
                options={[
                  { value: 0, label: 'Tất cả' },
                  { value: 1, label: 'Bán' },
                  { value: 2, label: 'Cho thuê' },
                ]}
              ></Select>
            </Item>
          </Col>
          <Col span={6}>
            <Item name={'type'} label={'Loại bất động sản'}>
              <Select options={REAL_ESTATE_TYPE}></Select>
            </Item>
          </Col>
          <Col span={6}>
            <Item name={'service_pack_id'} label={'Gói tin'}>
              <Select placeholder={'Gói tin'} allowClear={true}>
                {servicePacks.map(pack => (
                  <Select.Option key={pack.id} value={pack.id}>
                    {pack.name} - {pack.amount} VNĐ
                  </Select.Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span={6}>
            <Item name={'status'} label={'Trạng thái'}>
              <Select
                options={[
                  { value: 0, label: 'Tất cả' },
                  { value: 1, label: 'Chờ duyệt' },
                  { value: 2, label: 'Đã duyệt' },
                  { value: 3, label: 'Hết hạn' },
                ]}
              ></Select>
            </Item>
          </Col>
          <Col span={18}>
            <Item label={'Địa chỉ bất động sản'}>
              <Row gutter={[10, 10]}>
                <SearchAddress form={form} location={location} />
              </Row>
            </Item>
          </Col>
        </Row>
        <Row justify="center">
          <Button
            type={'primary'}
            htmlType={'submit'}
            className="mr-base"
            loading={isGetList}
          >
            Tìm kiếm
          </Button>
        </Row>
      </Form>
    </Card>
  );
};

export default SearchRealEstates;
