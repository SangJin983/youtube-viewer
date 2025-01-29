import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    items: [],
  },
  reducers: {
    fetchVideos(state, action) {
      state.items = action.payload;
    },
  },
});

export const { fetchVideos } = videoSlice.actions;
export default videoSlice.reducer;
