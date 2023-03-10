import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import socketReducer from './slices/socketSlice';
import profileReducer from './slices/profileSlice';
import bookmarkReducer from './slices/bookmarkSlice';
import topicReducer from './slices/topicSlice';
import commentReducer from './slices/commentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
    profile: profileReducer,
    bookmark: bookmarkReducer,

export const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
    profile: profileReducer,
    bookmark: bookmarkReducer,
    topic: topicReducer,
    comment: commentReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
