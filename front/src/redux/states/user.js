import { createSlice } from "@reduxjs/toolkit";
import {
  clearLocalStorage,
  persistLocalStorage,
} from "@utilities/localStorage.utility";

export const userEmptyState = {
  id: "",
  name: "",
  lastname: "",
  email: "",
  image: "",
};

export const UserKey = "user";

export const userSlice = createSlice({
  name: UserKey,

  initialState: localStorage.getItem(UserKey)
    ? JSON.parse(localStorage.getItem(UserKey))
    : userEmptyState,

  reducers: {
    createUser: (state, action) => {
      persistLocalStorage(UserKey, action.payload);
      return action.payload;
    },
    modifyUser: (state, action) => {
      const updatedUser = { ...state, ...action.payload };
      persistLocalStorage(UserKey, updatedUser);
      return updatedUser;
    },
    resetUser: () => {
      clearLocalStorage(UserKey);
      return userEmptyState;
    },
  },
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;
