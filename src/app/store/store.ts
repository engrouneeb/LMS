import { configureStore } from '@reduxjs/toolkit';
import { assignmentsApi } from '@/features/assignments/api/assignmentsApi';

export const store = configureStore({
  reducer: {
    [assignmentsApi.reducerPath]: assignmentsApi.reducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(assignmentsApi.middleware),
}); 