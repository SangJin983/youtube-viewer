import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    list: [],
    nextPageToken: null,
    searchQuery: "",
  },
  reducers: {
    setVideos(state, action) {
      state.list = action.payload.items;
      state.nextPageToken = action.payload.nextPageToken;
      state.searchQuery = action.payload.searchQuery;
    },
    appendVideos(state, action) {
      const existingIds = new Set(state.list.map((v) => v.id.videoId));
      const uniqueItems = action.payload.items.filter(
        (item) => !existingIds.has(item.id.videoId)
      );
      state.list.push(...uniqueItems);
      state.nextPageToken = action.payload.nextPageToken;
    },
  },
});

export const { setVideos, appendVideos } = videoSlice.actions;
export default videoSlice.reducer;
