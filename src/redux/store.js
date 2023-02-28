import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slices/userSlice';
import socketReducer from './slices/socketSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
  },
});
