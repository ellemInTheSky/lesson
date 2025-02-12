import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNekoImages = createAsyncThunk(
  "anime/fetchNekoImages",
  async () => {
    const images = [];
    for (let i = 0; i < 10; i++) {
      const response = await axios.get("https://nekos.best/api/v2/neko");
      images.push(response.data.results[0].url);
    }
    return images;
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState: { nekoImages: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNekoImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNekoImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nekoImages = action.payload;
      })
      .addCase(fetchNekoImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default animeSlice.reducer;
