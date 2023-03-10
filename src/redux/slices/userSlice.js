import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: {
    info: null,
    accessToken: null,
    isLogin: false,
    provider: null,
    topicFollow: [],
  },
  error: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data.info = action.payload;
      state.data.isLogin = true;
      AsyncStorage.mergeItem(
        'user',
        JSON.stringify({
          info: state.data.info,
        }),
      );
    },
    updateUser: (state, action) => {
      const {info} = state.data;
      state.data.info = {
        ...info,
        ...action.payload,
      };
      AsyncStorage.mergeItem(
        'user',
        JSON.stringify({
          info: state.data.info,
        }),
      );
    },
    setAccessToken: (state, action) => {
      state.data.accessToken = action.payload.accessToken;
      state.data.isLogin = true;
      state.data.provider = action.payload.provider;
      AsyncStorage.mergeItem(
        'user',
        JSON.stringify({
          accessToken: action.payload.accessToken,
          provider: action.payload.provider,
        }),
      );
    },
    logout: (state, action) => {
      state.data.isLogin = false;
      state.data.info = null;
      state.data.accessToken = null;
      AsyncStorage.removeItem('user');
    },
  },
});

export const {setUser, setAccessToken, logout, updateUser} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
