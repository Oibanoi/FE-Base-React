import React from 'react';
import AppContainer from '../../AppLayout/AppContainer';
import UpsertRealEstate from '../../../components/RealEstate/UpsertRealEstate';

const UpdateRealEstate: React.FC = () => {
  return (
    <AppContainer title={'Cập nhật tin bất động sản'}>
      <UpsertRealEstate />
    </AppContainer>
  );
};

export default UpdateRealEstate;
