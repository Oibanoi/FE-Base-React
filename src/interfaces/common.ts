import { Locale } from 'antd/es/locale';
import { AxiosError } from 'axios';

export interface IPermission {
  app: string;
  resource: string;
  action?: string;
}

export interface IRoute {
  path: string;
  name: string;
  component: React.ElementType;
  permissions?: IPermission[];
  icon?: React.ComponentType<{ className?: string; style?: object }>;
  children?: string[];
}
export interface ColorPreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
}

export interface IRegionItem {
  key: string;
  name: string;
  flag: string;
  antdLocale: Locale;
}

export interface IRegion {
  [key: string]: IRegionItem;
}

export type IErrorInterceptor = AxiosError<{ message?: string }>;
