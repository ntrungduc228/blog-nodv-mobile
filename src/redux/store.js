import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import socketReducer from './slices/socketSlice';
import profileReducer from './slices/profileSlice';
import bookmarkReducer from './slices/bookmarkSlice';
import commentReducer from './slices/commentSlice';
import commentInputReducer from './slices/commentInputSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
    profile: profileReducer,
    bookmark: bookmarkReducer,
    comment: commentReducer,
    commentInput: commentInputReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
