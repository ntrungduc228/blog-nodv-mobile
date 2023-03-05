import bookmarkReducer from './slices/bookmarkSlice';
import {configureStore} from '@reduxjs/toolkit';
import socketReducer from './slices/socketSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
    bookmark: bookmarkReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
