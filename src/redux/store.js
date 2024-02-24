import { configureStore } from "@reduxjs/toolkit";
import travelSlice from "./slice";

const store = configureStore({
  reducer: {
    travel: travelSlice.reducer
  },
});

export default store;