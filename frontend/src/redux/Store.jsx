import { configureStore } from "@reduxjs/toolkit";
import alertSliceReducer from "./features/Alertslice.mjs";
import userSliceReducer from "./features/UserSlice.mjs";

export const Store = configureStore({
  reducer: {
    alerts: alertSliceReducer,
    user: userSliceReducer,
  },
});
