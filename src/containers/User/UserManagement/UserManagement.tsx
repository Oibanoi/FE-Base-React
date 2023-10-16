import React, { useEffect, useState } from 'react';
import AppContainer from '../../AppLayout/AppContainer';
import SearchUsers from 'containers/User/UserManagement/SearchParams/SearchUsers';
import { useHistory } from 'react-router-dom';
import { userHooks } from '../../../hooks';
import { getColumns } from './column';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import { commonConstants } from 'constants/index';

const { Item } = Form;
const { DEFAULT_SIZE_CHANGER } = commonConstants;

const UserManagement: React.FC = () => {
  const history = useHistory();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [resetId, setResetId] = useState<number>();
  const [form] = Form.useForm();

  const { isGetUsers, users, getAll } = userHooks.useUser();
  const { loading, createUser } = userHooks.useAdminUser();

  const columns = getColumns({ history, resetId, setResetId });

  const onCreateUser = (values: any) => {
    createUser(values).then(() => {
      notification.success({
        message: 'Thành công',
        description: 'Tạo tài khoản thành công',
      });
      getAll({}).then();
      form.resetFields();
      setIsVisible(false);
    });
  };

  useEffect(() => {
    getAll({ search_param: undefined }).then();
  }, []);

  return (
    <AppContainer title={'Quản lý tài khoản'}>
      <SearchUsers
        getList={getAll}
        isGetList={isGetUsers}
        setIsVisible={setIsVisible}
      />
      <Card className="mt-base">
        <div>Tổng số bản ghi: {users.length}</div>
        <Table
          className="mt-base"
          columns={columns}
          dataSource={users}
          loading={isGetUsers}
          rowKey="id"
          pagination={DEFAULT_SIZE_CHANGER}
        />
      </Card>
      <Modal
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
      >
        <Form form={form} layout={'vertical'} onFinish={onCreateUser}>
          <Row>
            <Col span={24}>
              <Item
                name={'username'}
                label={'Tên đăng nhập'}
                rules={[{ required: true }]}
              >
                <Input></Input>
              </Item>
            </Col>
            <Col span={24}>
              <Item
                name={'full_name'}
                label={'Họ và tên'}
                rules={[{ required: true }]}
              >
                <Input></Input>
              </Item>
            </Col>
            <Col span={24}>
              <Item
                name={'phone_number'}
                label={'Số điện thoại'}
                rules={[{ required: true }]}
              >
                <Input></Input>
              </Item>
            </Col>
            <Col span={24}>
              <Item name={'email'} label={'Email'} rules={[{ required: true }]}>
                <Input></Input>
              </Item>
            </Col>
            <Col span={24}>
              <Item
                name={'role'}
                label={'Chức danh'}
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { value: 1, label: 'Người dùng' },
                    { value: 2, label: 'Nhân viên' },
                    { value: 3, label: 'Quản trị viên' },
                  ]}
                />
              </Item>
            </Col>
          </Row>
          <Row justify={'center'}>
            <Space className="mr-base">
              <Button
                danger
                type={'primary'}
                onClick={() => setIsVisible(false)}
              >
                Hủy
              </Button>
              <Button type={'primary'} htmlType={'submit'} loading={loading}>
                Tạo
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </AppContainer>
  );
};

export default UserManagement;
