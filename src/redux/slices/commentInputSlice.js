const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  initialComment: {},
  isEdit: false,
  isReply: false,
};
const commentInputSlice = createSlice({
  name: 'commentInput',
  initialState,
  reducers: {
    setInitialComment: (state, action) => {
      state.initialComment = action.payload;
      console.log('state', state.initialComment);
    },
    setIsReply: (state, action) => {
      state.isReply = action.payload ? action.payload : !state.isReply;
      console.log('reply', state.isReply);
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload ? action.payload : !state.isEdit;
      console.log('edit', state.isEdit);
    },
  },
});
export const {setInitialComment, setIsReply, setIsEdit} =
  commentInputSlice.actions;

const commentInputReducer = commentInputSlice.reducer;
export default commentInputReducer;
