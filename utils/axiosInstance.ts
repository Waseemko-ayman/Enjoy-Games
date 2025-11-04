import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
  },
});

export const setAxiosLocale = (locale: string) => {
  axiosInstance.defaults.headers['Accept-Language'] = locale;
};

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const currencyCode = localStorage.getItem('currencyCode');
    if (currencyCode) {
      config.headers['Currency'] = currencyCode;
    }
  }
  return config;
});

export default axiosInstance;
