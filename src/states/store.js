import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authUser/slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
