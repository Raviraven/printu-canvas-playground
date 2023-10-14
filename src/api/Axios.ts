import axios from 'axios';
import { toast } from 'react-toastify';

export interface ApiError {
  message: string;
}

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const apiError: ApiError = error.response?.data || {
        message: 'Network error',
      };
      toast.error(apiError.message);

      throw new Error(apiError.message);
    }

    toast.error(error);
  },
);
