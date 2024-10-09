import { SignInForm } from 'components/User/SignInForm';
import { userHooks } from 'hooks';

const Login = () => {
  const { login, actionLoading } = userHooks.useUser();
  return (
    <SignInForm
      onSubmit={(v) => login(v.email, v.password)}
      loading={actionLoading}
    />
  );
};
export default Login;
