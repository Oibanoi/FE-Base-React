import { IRegion } from 'interfaces';
// Flags
import enFlag from 'assets/images/flags/en.svg';
import viFlag from 'assets/images/flags/vi.svg';
// Translation files
import enTrans from 'locales/en/translation.json';
import viTrans from 'locales/vi/translation.json';
// Antd locale files
import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';

const RESOURCES = {
  vi: { translation: viTrans },
  en: { translation: enTrans },
};

const REGIONS: IRegion = {
  vi: {
    key: 'vi',
    name: 'Tiếng Việt',
    flag: viFlag,
    antdLocale: viVN,
  },
  en: {
    key: 'en',
    name: 'English',
    flag: enFlag,
    antdLocale: enUS,
  },
};

export default {
  RESOURCES,
  REGIONS,
};
