import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    items: [],
    searchQuery: "",
  },
  reducers: {
    fetchVideos(state, action) {
      state.items = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { fetchVideos, setSearchQuery } = videoSlice.actions;
export default videoSlice.reducer;
