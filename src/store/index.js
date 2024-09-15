import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {apiSlice} from './slices/apiSlice'; // You'll define this later

export const store = configureStore({
  reducer: {
    // Add the API reducer here
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Optional, but recommended for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
