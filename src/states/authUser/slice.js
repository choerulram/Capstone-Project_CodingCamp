import { createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api.js"; // Add .js extension

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
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
      state.user = action.payload;
      state.error = null;
    },
    setAuthError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
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
      localStorage.setItem("userId", response.userId);
      localStorage.setItem("name", response.name);

      dispatch(
        setAuthSuccess({
          token: response.token,
          userId: response.userId,
          name: response.name,
        })
      );
    } else {
      throw new Error("Token tidak ditemukan dalam response");
    }

    return response;
  } catch (error) {
    dispatch(setAuthError(error.message));
    throw error;
  }
};

export default authSlice.reducer;
