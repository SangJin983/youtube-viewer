import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    items: [],
    searchQuery: "",
    nextPageToken: "",
  },
  reducers: {
    fetchVideos(state, action) {
      state.items = action.payload.items;
      state.nextPageToken = action.payload.nextPageToken;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    addVideos(state, action) {
      state.items.push(...action.payload.items);
      state.nextPageToken = action.payload.nextPageToken;
    },
  },
});

export const { fetchVideos, setSearchQuery, addVideos } = videoSlice.actions;
export default videoSlice.reducer;
