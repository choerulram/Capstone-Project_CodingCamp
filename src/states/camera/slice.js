import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  devices: [], // Akan menyimpan array of { deviceId, label } saja
  selectedDevice: null, // Hanya menyimpan deviceId
  stream: null, // Akan dikelola di level komponen
  error: null,
  hasPermission: false,
  isScanning: false,
};

const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    setSelectedDevice: (state, action) => {
      state.selectedDevice = action.payload;
    },
    setStream: (state, action) => {
      state.stream = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setHasPermission: (state, action) => {
      state.hasPermission = action.payload;
    },
    setIsScanning: (state, action) => {
      state.isScanning = action.payload;
    },
    resetCamera: (state) => {
      // Stop existing stream if any
      if (state.stream) {
        state.stream.getTracks().forEach((track) => track.stop());
      }
      // Reset to initial state
      return {
        ...initialState,
        devices: state.devices, // Pertahankan daftar devices
      };
    },
  },
});

export const {
  setDevices,
  setSelectedDevice,
  setStream,
  setError,
  setHasPermission,
  setIsScanning,
  resetCamera,
} = cameraSlice.actions;

export default cameraSlice.reducer;
