import { getData } from '../../helpers/request';
import {
  IGetTransactionsReq,
  IGetTransactionsResp,
  IUpsertTransactionReq,
} from '../../interfaces/transactions';
import { requestServices } from '../index';

const { baseClient } = requestServices;

const getTransactions = (
  params: IGetTransactionsReq
): Promise<IGetTransactionsResp> => {
  return baseClient.get('/transactions', { params: params }).then(getData);
};

const upsertTransaction = (
  payload: IUpsertTransactionReq
): Promise<{ id: number }> => {
  return baseClient.post('/transactions', payload).then(getData);
};

export default {
  getTransactions,
  upsertTransaction,
};
