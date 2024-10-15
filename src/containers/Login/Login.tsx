import { Col, Row } from 'antd';
import bg from 'assets/images/bg.jpeg';
import { SignInForm } from 'components/User/SignInForm';
import { userHooks } from 'hooks';
import { Navigate, useNavigate } from 'react-router-dom';
const Login = () => {
  const { login, actionLoading } = userHooks.useUser();
  if (localStorage.getItem('token')) {
    return <Navigate to={'/'} />;
  }
  let navigate = useNavigate();
  return (
    <Row justify="space-around" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        <SignInForm
          onSubmit={(v) =>
            login(v.email, v.password).then(() => {
              console.log('login success');
              navigate('/');
            })
          }
          loading={actionLoading}
        />
      </Col>
      <Col span={16} style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={bg}
          alt="Login Image"
          style={{ width: '88%', borderRadius: '30px' }}
        />
      </Col>
    </Row>
  );
};
export default Login;
