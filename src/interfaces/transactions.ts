import { IPaginationResp } from './common';

export interface IGetTransactionsReq {
  user_id?: number;
  type?: number;
  status?: number;
  created_from?: number;
  created_at?: number;
  page?: number;
  page_size?: number;
}

export interface ITransactionItem {
  id: number;
  user_id: number;
  user_name: string;
  user_email?: string;
  type: number;
  status: number;
  amount: number;
  created_at: string;
}

export interface IGetTransactionsResp {
  items: ITransactionItem[];
  pagination: IPaginationResp;
}

export interface IUpsertTransactionReq {
  id?: number;
  amount?: number;
  type?: number;
  status?: number;
}
