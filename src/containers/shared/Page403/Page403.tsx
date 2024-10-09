import { Result } from 'antd';
import { BackToHomeButton, LogoutButton } from 'components/shared/Button';
import { t } from 'i18next';

const Page403: React.FC = () => {
  return (
    <Result
      className="app-result-page"
      status="403"
      title="403"
      subTitle={t(t('PermissionDenied'))}
      extra={
        <>
          <BackToHomeButton className="mr-half" />
          <LogoutButton />
        </>
      }
    />
  );
};

export default Page403;
