import { requestServices } from '../index';
import { getData } from '../../helpers/request';
import {
  IGetServicePack,
  IServicePackItem,
  IUpsertPack,
} from '../../interfaces/servicePack';

const { baseClient } = requestServices;

const getAllPacks = (params?: IGetServicePack): Promise<IServicePackItem[]> => {
  return baseClient.get('/service_packs', { params: params }).then(getData);
};

const upsertPack = (payload: IUpsertPack): Promise<{ id: number }> => {
  return baseClient.post('/service_packs', payload).then(getData);
};

export default {
  getAllPacks,
  upsertPack,
};
