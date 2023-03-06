import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setProfile} = profileSlice.actions;

const profileReducer = profileSlice.reducer;
export default profileReducer;
