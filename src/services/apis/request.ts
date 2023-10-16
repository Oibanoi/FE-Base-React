import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { requestHelpers } from 'helpers';
import { userServices } from '../index';

const { apiServices } = window.config;

const baseClient = axios.create({
  baseURL: apiServices.client,
});

const getAuthorization = () => {
  return userServices.isLoggedIn()
    ? `Bearer ${userServices.getAccessToken()}`
    : '';
};

// Do something before request is sent
const requestInterceptor = (request: AxiosRequestConfig) => {
  request.headers.Authorization = getAuthorization();
  return request;
};

// Any status code that lie within the range of 2xx cause this function to trigger
const responseSuccessInterceptor = (response: AxiosResponse) => {
  // Do something with response data
  return response;
};

// Any status codes that falls outside the range of 2xx cause this function to trigger
const responseErrorInterceptor = (error: AxiosError) => {
  // Do something with response error
  requestHelpers.handleResponseError(error);
  return Promise.reject(error);
};

const clients = [baseClient];

clients.forEach(client => {
  client.interceptors.request.use(requestInterceptor);
  client.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor
  );
});

export default {
  baseClient,
};
