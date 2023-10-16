import { notification } from 'antd';
import { AxiosError } from 'axios';
// import { userServices } from "services";

const handleResponseError = (error: AxiosError) => {
  const status = error && error.response && error.response.status;
  switch (status) {
    // case 401:
    //   userServices.logout();
    //   break;
    // case 403:
    //   userServices.denyAccess();
    //   break;
    default:
      let message = null;
      // Handle error message from API response
      if (error.response && error.response.data) {
        const { data } = error.response;
        message = data.message;
      }
      notification.error({
        message: 'Có lỗi',
        description: message || 'Có lỗi xảy ra',
      });
      break;
  }
};

export const getResult = (response: any) => response.data;
export const getData = (response: any) => response.data.data;

export default {
  handleResponseError,
};
