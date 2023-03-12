const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  initialComment: {},
};
const commentInputSlice = createSlice({
  name: 'commentInput',
  initialState,
  reducers: {
    setInitialComment: (state, action) => {
      state.initialComment = action.payload;
    },
  },
});
export const {setInitialComment} = commentInputSlice.actions;

const commentInputReducer = commentInputSlice.reducer;
export default commentInputReducer;
