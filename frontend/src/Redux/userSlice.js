import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  posts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    logout(state) {
      state.user = null;
      state.posts = [];
    },
  },
});

export const { setUser, setPosts, logout } = userSlice.actions;
export default userSlice.reducer;
