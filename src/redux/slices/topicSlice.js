import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  topicFollow: [],
};
const topicSlice = createSlice({
  initialState,
  name: 'topic',
  reducers: {
    setTopic: (state, action) => {
      state.topicFollow = action.payload
        ? [{name: 'For you'}, ...action.payload]
        : [];
    },
    updateTopic: (state, action) => {
      state.topicFollow = action.payload ? action.payload : [];
    },
  },
});

export const {setTopic, updateTopic} = topicSlice.actions;

const topicReducer = topicSlice.reducer;
export default topicReducer;
