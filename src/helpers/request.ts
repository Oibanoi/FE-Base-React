import { notification } from 'antd';
import { t } from 'helpers/i18n';
import { IErrorInterceptor } from 'interfaces';
import { userServices } from 'services';

const handleResponseError = (error: IErrorInterceptor) => {
  const status = error && error.response && error.response.status;
  let message = null;
  switch (status) {
    case 401:
      userServices.logout();
      
      break;
    case 403:
      userServices.denyAccess();
      break;
    default:
      // Handle error message from API response
      if (error.response && error.response.data) {
        const { data } = error.response;
        message = data.message;
      }
      notification.error({
        message: t('Error'),
        description: message || t('SomethingWentWrong'),
      });
      break;
  }
};
export const getResult = (response: any) => response.data;
export const getData = (response: any) => response.data.data;

export default {
  handleResponseError,
};
