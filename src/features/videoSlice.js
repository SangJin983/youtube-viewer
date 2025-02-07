import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    results: [],
    nextPageToken: null,
    searchQuery: "",
  },
  reducers: {
    setVideos(state, action) {
      state.results = action.payload.items;
      state.nextPageToken = action.payload.nextPageToken;
      state.searchQuery = action.payload.searchQuery;
    },
    appendVideos(state, action) {
      const existingIds = new Set(state.results.map((v) => v.id.videoId));
      const uniqueItems = action.payload.items.filter(
        (item) => !existingIds.has(item.id.videoId)
      );
      state.results.push(...uniqueItems);
      state.nextPageToken = action.payload.nextPageToken;
    },
  },
});

export const { setVideos, appendVideos } = videoSlice.actions;
export default videoSlice.reducer;
