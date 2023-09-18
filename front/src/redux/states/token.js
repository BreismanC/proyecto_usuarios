import { createSlice } from "@reduxjs/toolkit";
import {
  clearLocalStorage,
  persistLocalStorage,
} from "@utilities/localStorage.utility";

export const tokenEmptyState = null;

export const TokenKey = "token";

export const tokenSlice = createSlice({
  name: TokenKey,
  initialState: localStorage.getItem(TokenKey) || tokenEmptyState,
  reducers: {
    createToken: (state, action) => {
      persistLocalStorage(TokenKey, action.payload);
      return action.payload;
    },

    resetToken: () => {
      clearLocalStorage(TokenKey);
      return tokenEmptyState;
    },
  },
});

export const { createToken, resetToken } = tokenSlice.actions;
