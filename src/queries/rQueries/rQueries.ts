'use client';

import axios from 'axios';

export const rAPI = axios.create({
  baseURL: process.env.R_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
