import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ConnectionCheck } from '../types';

const address = import.meta.env.VITE_SERVER_ADDRESS;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${address}/` }),
  endpoints: (builder) => ({
    checkConnection: builder.query<ConnectionCheck, void>({
      query: () => 'checkConnection',
    }),
  }),
});

export const { useCheckConnectionQuery } = api;
