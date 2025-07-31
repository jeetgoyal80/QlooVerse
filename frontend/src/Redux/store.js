// src/Redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice.js";
import userReducer from "./userSlice.js";

export const store = configureStore({
  reducer: {
    post: postReducer,
     user: userReducer,
  },
});
