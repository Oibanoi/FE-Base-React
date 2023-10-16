import React from 'react';
import { Button, Form, Image, Input } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import background from '../../assets/images/2.jpeg';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './Register.scss';
import { validationHelpers } from '../../helpers';
import { userHooks } from '../../hooks';

const { Item } = Form;
const { phoneValidator, emailValidator } = validationHelpers;

const Register: React.FC = () => {
  const history = useHistory();

  const [form] = Form.useForm();
  const { isRegister, register } = userHooks.useUser();

  const onRegister = (values: any) => {
    register(values).then();
  };

  if (localStorage.getItem('token')) {
    return <Redirect to={'/'} />;
  }

  return (
    <div className={'login-page'}>
      <div className={'login-box'}>
        <div className="illustration-wrapper">
          <Image src={background} preview={false} />
        </div>
        <Form
          name={'login-form'}
          form={form}
          initialValues={{ remember: true }}
          onFinish={onRegister}
        >
          <p>Xin chào bạn</p>
          <p className={'form-title'}>Đăng ký tài khoản mới</p>
          <Item
            name="full_name"
            rules={[{ required: true, message: 'Yêu cầu nhập họ và tên' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
          </Item>
          <Item
            name="email"
            rules={[
              ...emailValidator,
              { required: true, message: 'Yêu cầu nhập Email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Item>
          <Item
            name="phone_number"
            rules={[
              ...phoneValidator,
              { required: true, message: 'Yêu cầu nhập số điện thoại' },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
          </Item>
          <Item
            name="username"
            rules={[{ required: true, message: 'Yêu cầu nhập tên đăng nhập' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Item>
          <Item
            name="password"
            rules={[{ required: true, message: 'Yêu cầu nhập mật khẩu' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Item>
          <Item
            name="re_password"
            rules={[
              { required: true, message: 'Yêu cầu nhập lại mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                },
              }),
            ]}
            dependencies={['password']}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập lại mật khẩu"
            />
          </Item>
          <Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isRegister}
            >
              ĐĂNG KÝ
            </Button>
          </Item>
          <Item>
            <p style={{ textAlign: 'center' }}>
              <p>
                {`Đã có tài khoản? `}
                <Link to={'/login'}>Đăng nhập</Link>
              </p>
            </p>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
