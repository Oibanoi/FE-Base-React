import { Result } from 'antd';
import { BackToHomeButton, LogoutButton } from 'components/shared/Button';
import { t } from 'helpers/i18n';

const Page404: React.FC = () => {
  return (
    <Result
      className="app-result-page"
      status="404"
      title="404"
      subTitle={t('PageNotFound')}
      extra={
        <>
          <BackToHomeButton className="mr-half" />
          <LogoutButton />
        </>
      }
    />
  );
};

export default Page404;
