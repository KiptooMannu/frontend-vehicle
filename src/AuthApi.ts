// src/api/authApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './types';

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://vehicle-management-backend.onrender.com/' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'api/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: 'api/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

type UseLoginMutation = typeof authApi.endpoints.login.useMutation;
type UseRegisterMutation = typeof authApi.endpoints.register.useMutation;

export const useLoginMutation: UseLoginMutation = authApi.endpoints.login.useMutation;
export const useRegisterMutation: UseRegisterMutation = authApi.endpoints.register.useMutation;
