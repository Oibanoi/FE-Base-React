import { IPaginationResp } from './common';

export interface IUpsertRealEstate {
  id?: number;
  title?: string;
  description?: string;
  transaction_type?: number;
  type?: number;
  province?: string;
  district?: string;
  ward?: string;
  address?: string;
  area?: number;
  frontage_area?: number;
  number_of_floor?: number;
  number_of_bedroom?: number;
  number_of_bathroom?: number;
  images?: string;
  service_pack_id?: number;
}

export interface IGetRealEstateReq {
  transaction_type?: number;
  type?: number;
  province?: string;
  district?: string;
  ward?: string;
  area_from?: string;
  area_to?: string;
  number_of_floor?: number;
  number_of_bedroom?: number;
  number_of_bathroom?: number;
  status?: number;
  price_from?: number;
  price_to?: number;
  page?: number;
  page_size?: number;
}

export interface IRealEstateItem {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  transaction_type: number;
  type: number;
  province?: string;
  district?: string;
  ward?: string;
  address?: string;
  area?: string;
  frontage_are?: string;
  number_of_floor?: number;
  number_of_bedroom?: number;
  number_of_bathroom?: number;
  images?: string;
  price?: number;
  service_pack_id: number;
  expired_at?: string;
  number_of_view: number;
  status: number;
  reason_reject?: string;
  approver_id?: number;
  approved_at?: number;
  service_pack_name?: string;
  service_pack_amount?: string;
}

export interface IGetRealEstateResp {
  items: IRealEstateItem[];
  pagination: IPaginationResp;
}
