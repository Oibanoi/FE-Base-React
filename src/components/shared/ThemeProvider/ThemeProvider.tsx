import { App, ConfigProvider, theme } from 'antd';
import { localStorageConstants } from 'constants/index';
import { ThemeContext } from 'contexts';
import { ColorPreset } from 'interfaces/common';
import { useState } from 'react';

const { APP_COLOR_PRESET, APP_THEME, COLOR_SCHEME } = localStorageConstants;

const defaultColorPreset = window.colorPresets?.teko || {
  id: 'teko',
  name: 'TEKO',
  primary: '#1677ff',
  secondary: '#005EE2',
};

const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [colorPreset, setColorPreset] = useState<ColorPreset>(() => {
    const storedColorPreset = localStorage.getItem(APP_COLOR_PRESET);
    return storedColorPreset
      ? JSON.parse(storedColorPreset)
      : defaultColorPreset;
  });
  const [themeMode, setThemeMode] = useState(() => {
    const storedThemeMode = localStorage.getItem(APP_THEME);
    return storedThemeMode ? JSON.parse(storedThemeMode) : COLOR_SCHEME.LIGHT;
  });

  return (
    <ThemeContext.Provider
      value={{
        colorPreset,
        setColorPreset,
        themeMode,
        setThemeMode,
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colorPreset.primary,
            motion: false,
          },
          algorithm:
            themeMode === COLOR_SCHEME.DARK ? [theme.darkAlgorithm] : [],
          components: {
            Layout: {
              algorithm: true,
              siderBg: themeMode === COLOR_SCHEME.DARK ? '#000' : '#1B1D29',
              headerBg: themeMode === COLOR_SCHEME.DARK ? '#000' : '#fff',
              bodyBg: themeMode === COLOR_SCHEME.DARK ? '#1f1f1f' : '#f5f5f5',
              footerBg: themeMode === COLOR_SCHEME.DARK ? '#000' : '#1B1D29',
            },
            Menu: {
              algorithm: true,
              motion: true,
            },
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
