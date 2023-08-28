import { createSlice } from "@reduxjs/toolkit";
import {
  clearLocalStorage,
  persistLocalStorage,
} from "@utilities/localStorage.utility";
import { tokenEncoder } from "@security/bcrypt";

export const tokenEmptyState = null;

export const TokenKey = "token";

export const tokenSlice = createSlice({
  name: TokenKey,
  initialState: localStorage.getItem(TokenKey)
    ? JSON.parse(localStorage.getItem(TokenKey))
    : tokenEmptyState,
  reducers: {
    createToken: async (state, action) => {
      console.log({token:action.payload})
      const hashedToken = await tokenEncoder(action.payload);
      console.log({hashedToken});
      persistLocalStorage(TokenKey, hashedToken);
      return action.payload;
    },

    resetToken: () => {
      clearLocalStorage(TokenKey);
      return tokenEmptyState;
    },
  },
});

export const { createToken, resetToken } = tokenSlice.actions;
