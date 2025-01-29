import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../features/videoSlice";

const store = configureStore({ reducer: { videos: videoReducer } });

export default store;
