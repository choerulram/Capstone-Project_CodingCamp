import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js"; // Add .js extension

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.login(credentials);
      // Store token in localStorage upon successful login
      if (response.token) {
        localStorage.setItem("token", response.token);
        if (response.user) {
          localStorage.setItem("userId", response.user.id);
          localStorage.setItem("name", response.user.name);
        }
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const savedToken = localStorage.getItem("token");
const userData = savedToken ? parseJwt(savedToken) : null;

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: !!savedToken,
  token: savedToken || null,
  user: userData
    ? {
        id: userData.id || userData.sub,
        name: userData.name || userData.nama,
        email: userData.email,
      }
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
