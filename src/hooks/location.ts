import { useState } from 'react';
import { assignWith } from 'lodash';
import { locationServices } from '../services';

const useLocation = () => {
  const [location, setLocation] = useState<any[]>([]);
  const [isGetLocation, setIsGetLocation] = useState<boolean>(false);

  const getLocation = async () => {
    try {
      setIsGetLocation(true);
      const res = await locationServices.getLocation();
      if (res) {
        setLocation(res);
      }
    } finally {
      setIsGetLocation(false);
    }
  };

  return {
    isGetLocation,
    getLocation,
    location,
  };
};

export default {
  useLocation,
};
