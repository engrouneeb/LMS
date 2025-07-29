import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/store';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // We'll make this configurable through env later
    prepareHeaders: (headers, { getState }) => {
      // Add auth token to headers if available
      const token = (getState() as RootState).auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'User',
    'Course',
    'Assignment',
    'Attendance',
    'Staff',
    'Students',
    'Chat',
    'Announcement',
    'Event',
    'Calendar',
    'Billing',
    'Report'
  ],
  endpoints: () => ({}),
}); 