import { createSlice } from "@reduxjs/toolkit";

export const AlertSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => void (state.loading = true),
    hideLoading: (state) => void (state.loading = false),
  },
});

export const { showLoading, hideLoading } = AlertSlice.actions;
export default AlertSlice.reducer;
