import { requestServices } from '../index';
import { getData } from '../../helpers/request';
import {
  IGetRealEstateReq,
  IGetRealEstateResp,
  IRealEstateItem,
  IUpsertRealEstate,
} from '../../interfaces/realEstate';

const { baseClient } = requestServices;

const upsert = (payload: IUpsertRealEstate): Promise<{ id: number }> => {
  return baseClient.post('/real_estates', payload).then(getData);
};

const getRealEstates = (
  params: IGetRealEstateReq
): Promise<IGetRealEstateResp> => {
  return baseClient.get('/real_estates', { params: params }).then(getData);
};

const getDetail = (id: number): Promise<IRealEstateItem> => {
  return baseClient.get(`/real_estates/${id}`).then(getData);
};

const deleteRealEstate = (id: number): Promise<{}> => {
  return baseClient.delete(`/real_estates/${id}`).then(getData);
};

const approveRealEstate = (
  status: number,
  id?: number,
  reason_reject?: string
): Promise<{ id: number }> => {
  return baseClient
    .put(`/real_estates/${id}/approve`, {
      status: status,
      reason_reject: reason_reject,
    })
    .then(getData);
};

export default {
  upsert,
  getRealEstates,
  getDetail,
  deleteRealEstate,
  approveRealEstate,
};
