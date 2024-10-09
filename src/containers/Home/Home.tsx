import { Typography } from 'antd';
import { t } from 'helpers/i18n';

const { Text } = Typography;

const Home: React.FC = () => {
  return <Text>{t('Home')}</Text>;
};

export default Home;
