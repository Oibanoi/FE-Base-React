import localizationConstants from 'constants/localization';
import localizationHelpers from 'helpers/localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const { RESOURCES, REGIONS } = localizationConstants;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: RESOURCES,
    lng: localizationHelpers.getCurrentLanguage(),
    fallbackLng: REGIONS.vi.key,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
