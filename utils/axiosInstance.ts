// utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const locale = localStorage.getItem('NEXT_LOCALE') || 'ar';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Accept-Language'] = locale;
  }

  return config;
});

export default axiosInstance;
