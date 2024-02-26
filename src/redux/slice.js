import { createSlice } from "@reduxjs/toolkit";

const travelSlice = createSlice({
  name: 'travel',
  initialState: {
    trips: [],
    weatherData: null,
  },
  reducers: {
    addTrip(state, action){
      state.trips.push(action.payload);
    },
    removeTrip(state, action){
      const index = state.trips.findIndex((trip) => trip.country === action.payload);
      if (index !== -1) {
        state.trips.splice(index, 1);
      }
    },
    updateTrip(state, action){
      const trip = state.trips.find((trip) => trip.id === action.payload);
      trip.country = action.payload.country;
      trip.arrivalDate = action.payload.arrivalDate;
      trip.departureDate = action.payload.departureDate;
    },
    setWeatherData(state, action) {
      state.weatherData = action.payload;
    },
  }
})

export default travelSlice;

export const { addTrip, removeTrip, updateTrip, setWeatherData } = travelSlice.actions;