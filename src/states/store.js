import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authUser/slice.js";
import cameraReducer from "./camera/slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    camera: cameraReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["camera/setDevices", "camera/setStream"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.devices", "payload.stream"],
        // Ignore these paths in the state
        ignoredPaths: ["camera.devices", "camera.stream"],
      },
    }),
});

export default store;
