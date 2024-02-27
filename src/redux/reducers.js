import { combineReducers } from "@reduxjs/toolkit";
import {travelSlice, fetchWeather} from "./slice";

const rootReducer = combineReducers({
  travel: travelSlice.reducer, 
  weather: (state = {}, action) => {
    switch (action.type) {
      case fetchWeather.fulfilled:
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  },
});

export default rootReducer;