import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./favoritesSlice";
import { userSlice } from "./userSlice";

export default configureStore({
  reducer: {
    favorites: favoritesSlice,
    user: userSlice.reducer,
  },
});
