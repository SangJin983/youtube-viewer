import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    searchResult: [],
    nextPageToken: null,
    searchQuery: "",
  },
  reducers: {
    setVideos(state, action) {
      state.searchResult = action.payload.items;
      state.nextPageToken = action.payload.nextPageToken;
      state.searchQuery = action.payload.searchTerm;
    },
    appendVideos(state, action) {
      const existingIds = new Set(state.searchResult.map((v) => v.id.videoId));
      const uniqueItems = action.payload.items.filter(
        (item) => !existingIds.has(item.id.videoId)
      );
      state.searchResult.push(...uniqueItems);
      state.nextPageToken = action.payload.nextPageToken;
    },
  },
});

export const { setVideos, appendVideos } = videoSlice.actions;
export default videoSlice.reducer;
