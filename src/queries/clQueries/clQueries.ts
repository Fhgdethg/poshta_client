'use client';

import axios from 'axios';

import { lSKeys } from '@/constants/lSKeys';
import { clQKeys } from '@/queries/clQueries/clQKeys';

let t = '';

if (typeof window !== 'undefined') {
  if (typeof localStorage !== 'undefined' && localStorage?.[lSKeys.t]) {
    t = String(localStorage.getItem(lSKeys.t));
  }
}

export const clAPI = axios.create({
  baseURL: `${process.env.SERVER_URL}${clQKeys.api}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${t}`,
  },
});
