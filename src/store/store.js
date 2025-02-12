import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "./slice/wifuSlice";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
  },
});
