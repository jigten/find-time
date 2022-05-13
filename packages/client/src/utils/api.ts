import axios from 'axios';
import {TOKEN_KEY} from './constants';

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const idToken = localStorage.getItem(TOKEN_KEY);
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== '/users/register' && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const idToken = localStorage.getItem(TOKEN_KEY);
        if (idToken) {
          const {data} = await instance.get('/users/refresh-token', {headers: {Authorization: `Bearer ${idToken}`}});
          localStorage.setItem(TOKEN_KEY, data.idToken);
          dispatchEvent(new CustomEvent('token-refreshed'));
          return instance(originalConfig);
        }
      }
    }
    return Promise.reject(err);
  },
);

export default instance;
