export interface IServicePackItem {
  id: number;
  name: string;
  amount: number;
  number_of_day: number;
  status: number;
}

export interface IUpsertPack {
  id?: number;
  name?: string;
  amount?: number;
  number_of_day?: number;
  status?: number;
}

export interface IGetServicePack {
  name?: string;
  status?: number;
}
