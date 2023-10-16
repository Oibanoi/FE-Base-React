import { useState } from 'react';
import {
  IGetServicePack,
  IServicePackItem,
  IUpsertPack,
} from '../interfaces/servicePack';
import { servicePackServices } from '../services';

const useServicePack = () => {
  const [isGetPacks, setIsGetPacks] = useState<boolean>(false);
  const [isUpsertPack, setIsUpsertPack] = useState<boolean>(false);

  const [servicePacks, setServicePacks] = useState<IServicePackItem[]>([]);

  const getAllPacks = async (params?: IGetServicePack) => {
    try {
      setIsGetPacks(true);
      const res = await servicePackServices.getAllPacks(params);
      if (res) {
        setServicePacks(res);
      }
    } finally {
      setIsGetPacks(false);
    }
  };

  const upsertPack = async (payload: IUpsertPack) => {
    try {
      setIsUpsertPack(true);
      await servicePackServices.upsertPack(payload);
    } finally {
      setIsUpsertPack(false);
    }
  };

  return {
    isGetPacks,
    servicePacks,
    getAllPacks,
    isUpsertPack,
    upsertPack,
  };
};

export default {
  useServicePack,
};
