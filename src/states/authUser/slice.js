import { createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api.js";

const initialState = {
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setAuthSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    setAuthError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { setAuthLoading, setAuthSuccess, setAuthError, logout } =
  authSlice.actions;

// Thunk actions
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setAuthLoading(true));
    const loginResult = await api.login(credentials);
    localStorage.setItem("token", loginResult.token);
    localStorage.setItem("userId", loginResult.userId);
    dispatch(setAuthSuccess(loginResult));
    return loginResult;
  } catch (error) {
    dispatch(setAuthError(error.message));
    throw error;
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setAuthLoading(true));
    const result = await api.register(userData);
    return result;
  } catch (error) {
    dispatch(setAuthError(error.message));
    throw error;
  }
};

export default authSlice.reducer;
