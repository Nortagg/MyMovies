import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";

const initialState = {
  email: "",
  uid: "",
  isLoggedIn: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        uid: action.payload.uid,
        isLoggedIn: true,
        isFetching: false,
        isSuccess: true,
        isError: false,
      };
    },
    resetUser: () => {
      auth.signOut();
      return initialState;
    },
  },
});

export const userSelector = (state) => state.user;
export const { setUser, resetUser } = userSlice.actions;
