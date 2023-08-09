import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (USER_ID) => {
    const q = query(
      collection(db, "favorites"),
      where("useruid", "==", USER_ID)
    );
    const querySnapshot = await getDocs(q);

    const favoritesData = querySnapshot.docs.map((doc) => doc.data());

    return favoritesData;
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    status: "idle",
    error: null,
  },
  reducers: {},
});

export default favoritesSlice.reducer;
