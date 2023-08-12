import { createSlice } from "@reduxjs/toolkit";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchFavorites = async (USER_ID) => {
  const q = query(collection(db, "favorites"), where("useruid", "==", USER_ID));
  const querySnapshot = await getDocs(q);

  const favoritesData = querySnapshot.docs.map((doc) => doc.data());
  return favoritesData;
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    error: null,
  },
  reducers: {
    setFavoriteMovies: (state, action) => {
      state.favoriteMovie = action.payload;
    },
  },
});

export const userSelector = (state) => state.favorites;
export const { setFavoriteMovies } = favoritesSlice.actions;
export default favoritesSlice.reducer;
