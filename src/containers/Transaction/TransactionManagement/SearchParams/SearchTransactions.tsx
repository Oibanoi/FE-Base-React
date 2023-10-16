import { Button, Card, Col, Form, Row, Select, Spin, DatePicker } from 'antd';
import React, { useEffect } from 'react';
import { userHooks } from '../../../../hooks';
import { datetimeConstants } from '../../../../constants';

const { Item } = Form;
const { RangePicker } = DatePicker;

const SearchTransactions = ({
  getList,
  isGetList,
}: {
  getList: (params: any) => void;
  isGetList: boolean;
}) => {
  const [form] = Form.useForm();

  const { isGetUsers, users, getAll } = userHooks.useUser();

  useEffect(() => {
    getAll({ role: 1 }).then();
  }, []);

  return isGetUsers ? (
    <Spin className="app-spin" />
  ) : (
    <Card style={{ boxShadow: '5px 8px 24px 5px #dcdedc' }}>
      <Form
        layout={'vertical'}
        form={form}
        onFinish={getList}
        initialValues={{
          type: 0,
          status: 0,
        }}
      >
        <Row gutter={[10, 10]}>
          <Col span={8}>
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
          <Col span={8}>
            <Item name={'type'} label={'Loại giao dịch'}>
              <Select
                options={[
                  { value: 0, label: 'Tất cả' },
                  { value: 1, label: 'Thanh toán gói dịch vụ' },
                  { value: 2, label: 'Nạp tiền' },
                ]}
              ></Select>
            </Item>
          </Col>
          <Col span={8}>
            <Item name={'status'} label={'Trạng thái'}>
              <Select
                options={[
                  { value: 0, label: 'Tất cả' },
                  { value: 1, label: 'Thành công' },
                  { value: 2, label: 'Thất bại' },
                  { value: 3, label: 'Chờ duyệt' },
                ]}
              ></Select>
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

export default SearchTransactions;
