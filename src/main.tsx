import { ConfigProvider } from 'antd';
import ThemeProvider from 'components/shared/ThemeProvider';
import { localizationConstants } from 'constants/index';
import { localizationHelpers } from 'helpers';
import i18n from 'i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App.tsx';

const { REGIONS } = localizationConstants;
const { getCurrentLanguage } = localizationHelpers;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <ConfigProvider locale={REGIONS[getCurrentLanguage()].antdLocale} >
          <App />
        </ConfigProvider>
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
