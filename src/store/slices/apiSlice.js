// slices/apiSlice.js
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
  endpoints: builder => ({
    getPosts: builder.query({
      // Accept page and limit as query parameters
      query: (page = 1) => `/posts?_page=${page}&_limit=10`,
    }),
  }),
});

export const {useGetPostsQuery} = apiSlice;
