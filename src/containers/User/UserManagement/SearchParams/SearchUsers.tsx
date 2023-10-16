import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';

const { Item } = Form;
const SearchUsers = ({
  getList,
  isGetList,
  setIsVisible,
}: {
  getList: (params: any) => void;
  isGetList: boolean;
  setIsVisible: (isVisible: boolean) => void;
}) => {
  const [form] = Form.useForm();

  return (
    <Card style={{ boxShadow: '5px 8px 24px 5px #dcdedc' }}>
      <Form layout={'vertical'} form={form} onFinish={getList}>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <Item name={'search_param'}>
              <Input placeholder={'Email, tên hoặc SĐT'} />
            </Item>
          </Col>
          <Col span={6}>
            <Item name={'status'}>
              <Select
                placeholder={'Trạng thái tài khoản'}
                options={[
                  { value: 0, label: 'Khóa' },
                  { value: 1, label: 'Hoạt động' },
                ]}
                allowClear={true}
              ></Select>
            </Item>
          </Col>
          <Col span={6}>
            <Button
              type={'primary'}
              htmlType={'submit'}
              className="mr-base"
              loading={isGetList}
            >
              Tìm kiếm
            </Button>
          </Col>
          <Col span={6}>
            <Item style={{ display: 'flex', justifyContent: 'end' }}>
              <Button type={'primary'} onClick={() => setIsVisible(true)}>
                Thêm tài khoản
              </Button>
            </Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SearchUsers;
