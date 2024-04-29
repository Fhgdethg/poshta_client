import axios from 'axios';

import { clQKeys } from '@/queries/clQueries/clQKeys';

export const clAPI = axios.create({
  baseURL: `${process.env.SERVER_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
