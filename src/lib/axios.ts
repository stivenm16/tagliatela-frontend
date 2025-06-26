// lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
