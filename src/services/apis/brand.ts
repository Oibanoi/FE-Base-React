import { IBrandFilters, IGetBrandResponse } from 'interfaces';
import requestServices from 'services/apis/request';

const { baseClient } = requestServices;

const getBrands = (params: IBrandFilters): Promise<IGetBrandResponse> => {
  return baseClient.get('/brands', {
    params,
  });
};

export default {
  getBrands,
};
