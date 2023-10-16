import React from 'react';
import { Button, Col, Form, Input, Layout, Row, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';
import './Login.scss';
import { userHooks } from '../../hooks';

const { Title } = Typography;
const { Content } = Layout;
const { Item } = Form;

const Login: React.FC = () => {
  const history = useHistory();

  const [form] = Form.useForm();

  const { login } = userHooks.useUser();

  const onLogin = (values: any) => {
    login(values.username, values.password).then(_ => {
      history.push('');
    });
  };

  if (localStorage.getItem('token')) {
    return <Redirect to={'/'} />;
  }

  return (
    <>
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row
            gutter={[10, 0]}
            justify="space-around"
            align="middle"
            className="width-100"
          >
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Đăng nhập</Title>
              <Title
                className="font-regular text-muted color-base"
                style={{ fontSize: 18 }}
                level={5}
              >
                <i>
                  Chào mừng bạn đến với trang quản lý. Vui lòng nhập tài khoản
                  và mật khẩu được cấp để tiếp tục
                </i>
              </Title>
              <Form
                form={form}
                onFinish={onLogin}
                layout="vertical"
                className="row-col"
              >
                <Item
                  className="username"
                  label="Tên tài khoản"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Hãy nhập tài khoản để đăng nhập!',
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Tên tài khoản"
                  />
                </Item>

                <Item
                  className="username"
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Hãy nhập mật khẩu để đăng nhập!',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Mật khẩu"
                  />
                </Item>

                <Item>
                  <Button
                    // loading={loading}
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%', fontSize: 17 }}
                  >
                    Đăng nhập
                  </Button>
                </Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Login;
