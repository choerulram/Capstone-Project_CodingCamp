import { createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api.js"; // Add .js extension

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  user: null,
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
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    setAuthError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
    },
  },
});

export const { setAuthLoading, setAuthSuccess, setAuthError, logout } =
  authSlice.actions;

// Thunk actions
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setAuthLoading(true));
    const response = await api.login(credentials);

    // Save auth data to localStorage
    if (response.token) {
      localStorage.setItem("token", response.token);
      // Save user data if available
      if (response.user) {
        localStorage.setItem("userId", response.user.id);
        localStorage.setItem("name", response.user.name);
      }

      // Update Redux state with both token and user info
      dispatch(
        setAuthSuccess({
          token: response.token,
          user: response.user,
        })
      );
    }
  } catch (error) {
    dispatch(setAuthError(error.message));
  }
};

export default authSlice.reducer;
