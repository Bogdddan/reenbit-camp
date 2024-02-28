import { combineReducers } from "@reduxjs/toolkit";
import {travelSlice} from "./slice";

const rootReducer = combineReducers({
  travel: travelSlice.reducer, 
});

export default rootReducer;