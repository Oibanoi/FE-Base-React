import React from 'react';
import AppContainer from '../../AppLayout/AppContainer';
import UpsertRealEstate from '../../../components/RealEstate/UpsertRealEstate';

const CreateRealEstate: React.FC = () => {
  return (
    <AppContainer title={'Đăng tin bất động sản'}>
      <UpsertRealEstate />
    </AppContainer>
  );
};

export default CreateRealEstate;
