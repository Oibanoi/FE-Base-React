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
    <SignInForm
      onSubmit={(v) =>
        login(v.email, v.password).then(() => {
          // do something
          console.log('login success');
          navigate('/');
        })
      }
      loading={actionLoading}
    />
  );
};
export default Login;
