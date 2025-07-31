// src/Redux/slices/postSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [], // array of trending posts
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    clearPosts: (state) => {
      state.posts = [];
    }
  },
});

export const { setPosts, addPost, clearPosts } = postSlice.actions;

export default postSlice.reducer;
