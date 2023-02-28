import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  loading: false,
  data: {
    info: null,
    accessToken: null,
    isLogin: false,
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
    },
    setAccessToken: (state, action) => {
      state.data.accessToken = action.payload;
      state.data.isLogin = true;
      AsyncStorage.setItem(
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

export const {setUser, setAccessToken, logout} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
