import { Locale } from 'antd/lib/locale-provider';

export interface IPermission {
  app: string;
  resource: string;
  action?: string;
}

export interface IRoute {
  exact?: boolean;
  path: string;
  name: string;
  component: any;
  permissions?: IPermission[];
  icon?: React.ComponentType<{ className?: string }>;
  children?: string[];
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

export interface IMap<T> {
  [key: string]: T;
}

export type AnyObject = IMap<any>;

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type PartialOptional<T, K extends keyof T> = Overwrite<
  T,
  Pick<Partial<T>, K>
>;

export interface IPaginationResp {
  current_page: number;
  page_size: number;
  total_items: number;
}
