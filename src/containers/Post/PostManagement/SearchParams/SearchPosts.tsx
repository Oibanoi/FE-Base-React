import { Button, Card, Col, Form, Input, Row, Select, Spin } from 'antd';
import React, { useEffect } from 'react';
import { userHooks } from 'hooks';

const { Item } = Form;

const SearchPosts = ({
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
          transaction_type: 0,
          type: 0,
          status: 0,
        }}
      >
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <Item name={'title'} label={'Tiêu đề'}>
              <Input placeholder={'Tiêu đề bài viết'} />
            </Item>
          </Col>
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
            <Item name={'status'} label={'Trạng thái'}>
              <Select
                options={[
                  { value: 0, label: 'Tất cả' },
                  { value: 1, label: 'Chờ duyệt' },
                  { value: 2, label: 'Đã duyệt' },
                  { value: 3, label: 'Từ chối' },
                ]}
              ></Select>
            </Item>
          </Col>
          <Col span={6}>
            <Item label={' '}>
              {' '}
              <Button
                type={'primary'}
                htmlType={'submit'}
                className="mr-base"
                loading={isGetList}
              >
                Tìm kiếm
              </Button>
            </Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SearchPosts;
