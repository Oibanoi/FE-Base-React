import { localStorageConstants } from 'constants/index';
import { ColorPreset } from 'interfaces/common';
import { createContext } from 'react';

const { COLOR_SCHEME } = localStorageConstants;

export const ThemeContext = createContext<{
  colorPreset: ColorPreset;
  setColorPreset: (colorPreset: ColorPreset) => void;
  themeMode: string;
  setThemeMode: (value: string) => void;
}>({
  colorPreset: {
    id: '',
    name: '',
    primary: '',
    secondary: '',
  },
  setColorPreset: () => {},
  themeMode: COLOR_SCHEME.LIGHT,
  setThemeMode: () => {},
});
