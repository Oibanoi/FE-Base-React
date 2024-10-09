import { Drawer, Radio, Typography } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import moonDarkIcon from 'assets/images/moon-dark.png';
import moonIcon from 'assets/images/moon.png';
import sunDarkIcon from 'assets/images/sun-dark.png';
import sunIcon from 'assets/images/sun.png';
import { localStorageConstants } from 'constants/index';
import { ThemeContext } from 'contexts';
import { t } from 'helpers/i18n';
import React, { useContext } from 'react';
import './AppSettings.scss';

const { colorPresets } = window;
const { Text } = Typography;

const { APP_COLOR_PRESET, APP_THEME, COLOR_SCHEME } = localStorageConstants;

const AppSettings: React.FC<{
  openSettings: boolean;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ openSettings, setOpenSettings }) => {
  return (
    <Drawer
      className="app-settings"
      title={t('Settings')}
      placement="right"
      onClose={() => setOpenSettings(false)}
      open={openSettings}
    >
      <ThemeSwitcher />
      <ColorOptions />
    </Drawer>
  );
};

const ThemeSwitcher = () => {
  const { themeMode, setThemeMode } = useContext(ThemeContext);

  const handleThemeChange = (e: RadioChangeEvent) => {
    setThemeMode(e.target.value);
    localStorage.setItem(APP_THEME, JSON.stringify(e.target.value));
  };

  return (
    <DrawerBlock title={t('ThemeMode')} className="theme-switcher">
      <Radio.Group
        className="radio-group"
        defaultValue={themeMode}
        onChange={handleThemeChange}
      >
        <RadioBox
          className="radio-box-theme-switcher"
          value={COLOR_SCHEME.LIGHT}
        >
          <img
            src={themeMode === COLOR_SCHEME.DARK ? sunDarkIcon : sunIcon}
            alt={COLOR_SCHEME.LIGHT}
          />
        </RadioBox>
        <RadioBox
          className="radio-box-theme-switcher"
          value={COLOR_SCHEME.DARK}
        >
          <img
            src={themeMode === COLOR_SCHEME.DARK ? moonDarkIcon : moonIcon}
            alt={COLOR_SCHEME.DARK}
          />
        </RadioBox>
      </Radio.Group>
    </DrawerBlock>
  );
};

const ColorOptions = () => {
  const { colorPreset, setColorPreset } = useContext(ThemeContext);

  const handleColorChange = (e: RadioChangeEvent) => {
    const selectedColorPreset = colorPresets[e.target.value];
    setColorPreset(selectedColorPreset);
    localStorage.setItem(APP_COLOR_PRESET, JSON.stringify(selectedColorPreset));
  };

  return (
    <DrawerBlock title={t('BrandColor')} className="color-options">
      <Radio.Group
        className="radio-group"
        defaultValue={colorPreset.id}
        onChange={handleColorChange}
      >
        {Object.keys(colorPresets).map((key) => (
          <RadioBox key={colorPresets[key].id} value={colorPresets[key].id}>
            <div className="radio-box-color-preset">
              <span
                className="radio-box-color-preset-sample"
                style={{ backgroundColor: colorPresets[key].primary }}
              />
              {colorPresets[key].name.toUpperCase()}
            </div>
          </RadioBox>
        ))}
      </Radio.Group>
    </DrawerBlock>
  );
};

const DrawerBlock = ({
  title,
  children,
  className,
}: React.PropsWithChildren<{ title: string; className?: string }>) => (
  <div className={`drawer-block ${className}`}>
    <Text strong>{title}</Text>
    {children}
  </div>
);

const RadioBox = ({
  value,
  children,
  className,
  ...props
}: React.PropsWithChildren<{ value: string; className?: string }>) => (
  <Radio.Button
    className={`radio-box ${className ?? ''}`}
    {...props}
    value={value}
  >
    {children}
  </Radio.Button>
);

export default AppSettings;
