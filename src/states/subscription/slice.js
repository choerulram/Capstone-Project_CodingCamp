import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scanCount: 0,
  isPremium: false,
  showLimitModal: false,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    incrementScanCount: (state) => {
      state.scanCount += 1;
      if (state.scanCount > 5 && !state.isPremium) {
        state.showLimitModal = true;
      }
    },
    setIsPremium: (state, action) => {
      state.isPremium = action.payload;
    },
    setShowLimitModal: (state, action) => {
      state.showLimitModal = action.payload;
    },
    resetScanCount: (state) => {
      state.scanCount = 0;
    },
  },
});

export const {
  incrementScanCount,
  setIsPremium,
  setShowLimitModal,
  resetScanCount,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
