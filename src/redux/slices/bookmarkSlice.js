import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  postIds: [],
  posts: [],
};
const bookmarkSlice = createSlice({
  initialState,
  name: 'bookmark',
  reducers: {
    setBookmark: (state, action) => {
      state.postIds = action.payload?.postIds;
      state.posts = action.payload?.posts ? action.payload?.posts : [];
    },
    updatePostByIdToBookmark: (state, action) => {
      // if post is exist in posts list
      if (state.postIds.includes(action.payload.id)) {
        // console.log("vo 1");
        state.postIds = state.postIds.filter(
          postId => postId !== action.payload.id,
        );
        state.posts = state.posts.filter(post => post.id !== action.payload.id);
      } else {
        // console.log("vo 2");
        // post is not exist in posts list
        let postIds = state.postIds;
        let posts = state.posts;

        postIds.unshift(action.payload.id);
        posts.unshift(action.payload);

        state.postIds = postIds;
        state.posts = posts;
      }
    },
    updateBookmark: (state, action) => {
      state.postIds = action.payload?.postIds;
      state.posts = action.payload.posts?.filter(post =>
        state.postIds.includes(post.id),
      );
    },
  },
});

export const {
  setBookmark,
  updatePostByIdToBookmark,
  updatePosts,
  updateBookmark,
} = bookmarkSlice.actions;

const bookmarkReducer = bookmarkSlice.reducer;
export default bookmarkReducer;
