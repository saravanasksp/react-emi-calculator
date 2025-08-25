// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import emiReducer from "./emiSlice";

export const store = configureStore({
  reducer: {
    emi: emiReducer,
  },
});
