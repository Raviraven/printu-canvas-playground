import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log('error!');
    console.error(error);
  },
);
