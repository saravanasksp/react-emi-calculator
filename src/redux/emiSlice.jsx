// src/redux/emiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  principal: 500000,
  rate: 10,
  time: 12,
  emi: 0,
  totalPayment: 0,
  totalInterest: 0,
};

const emiSlice = createSlice({
  name: "emi",
  initialState,
  reducers: {
    setPrincipal: (state, action) => {
      state.principal = action.payload;
    },
    setRate: (state, action) => {
      state.rate = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    calculateEMI: (state) => {
      const monthlyRate = state.rate / (12 * 100);
      const emiValue =
        (state.principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, state.time)) /
        (Math.pow(1 + monthlyRate, state.time) - 1);

      const totalPay = emiValue * state.time;
      const interest = totalPay - state.principal;

      state.emi = emiValue.toFixed(2);
      state.totalPayment = totalPay.toFixed(2);
      state.totalInterest = interest.toFixed(2);
    },
  },
});

export const { setPrincipal, setRate, setTime, calculateEMI } =
  emiSlice.actions;

export default emiSlice.reducer;
