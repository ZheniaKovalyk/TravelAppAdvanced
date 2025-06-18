import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://travel-app-api.up.railway.app/api/v1/auth/",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<UserResponse, RegisterRequest>({
      query(credentials) {
        return {
          url: "sign-up",
          method: "POST",
          body: credentials,
        };
      },
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authAPI;
