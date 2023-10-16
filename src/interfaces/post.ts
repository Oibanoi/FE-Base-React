import { IPaginationResp } from 'interfaces/common';

export interface IGetPostsReq {
  user_id?: number;
  title?: string;
  status?: number;
  page?: number;
  page_size?: number;
}

export interface IPostItem {
  id: number;
  user_id: number;
  user_full_name?: string;
  user_email?: string;
  user_phone?: string;
  title?: string;
  content?: string;
  images: string;
  status: number;
  reason_reject?: string;
}

export interface IGetPostsResp {
  items: IPostItem[];
  pagination: IPaginationResp;
}
