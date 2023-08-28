import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../states/user";
import { tokenSlice } from "../states/token";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    token: tokenSlice.reducer,
  },
});
