import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import socketReducer from './slices/socketSlice';
import profileReducer from './slices/profileSlice';
import bookmarkReducer from './slices/bookmarkSlice';
import topicReducer from './slices/topicSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
    profile: profileReducer,
    bookmark: bookmarkReducer,
    topic: topicReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
