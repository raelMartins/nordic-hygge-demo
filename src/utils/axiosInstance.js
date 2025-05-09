import axios from 'axios';
import {createStandaloneToast} from '@chakra-ui/react';
import Router from 'next/router';
import {BaseURL_TWO} from '../constants/routes';
import {getSession} from './sessionmanagers';

const toast = createStandaloneToast();

const axiosInstance = axios.create({
  baseURL: BaseURL_TWO,
  headers: {'Content-Type': 'application/json'},
  timeout: 30 * 60 * 1000,
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await getSession('token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => Promise.resolve(response),
  async error => {
    if (!error?.response) return Promise.reject(error);
    const user = await getSession('loggedIn');

    if (user && error?.response?.status === 401) {
      // toast({ title: "Access denied", status: "You are not authorized to view this page" });
      // localStorage.clear();
      // Router.push('/');
      location.assign('/');
    } else {
      return Promise.reject(error);
    }
  }
);

export const agent_auth_fetch = axios.create({
  baseURL: BaseURL_TWO,
  headers: {'Content-Type': 'application/json'},
  timeout: 30 * 60 * 1000,
});

agent_auth_fetch.interceptors.request.use(
  async config => {
    const token = await getSession('a_token');
    const agentInfo = await getSession('a_details');
    const storeName = agentInfo?.storeName;
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    if (storeName) config.headers['store-name'] = storeName;
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
