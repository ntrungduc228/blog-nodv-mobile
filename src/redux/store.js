import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import socketReducer from './slices/socketSlice';
import profileReducer from './slices/profileSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
    profile: profileReducer,
  },
});
