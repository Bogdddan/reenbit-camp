import { createSlice } from "@reduxjs/toolkit";

const travelSlice = createSlice({
  name: 'travel',
  initialState: {
    trips: [
      // {
      //   id: 1,
      //   country: "Україна",
      //   arrivalDate: "2024-02-24",
      //   departureDate: "2024-02-25",
      // },
       // {
      //   id: 2,
      //   country: "Пакістан",
      //   arrivalDate: "2024-03-24",
      //   departureDate: "2024-03-25",
      // },
    ],
  },
  reducers: {
    addTrip(state, action){
      state.trips.push(action.payload);
    },
    removeTrip(state, action){
      const index = state.trips.findIndex((trip) => trip.id === action.payload);
      state.trips.splice(index, 1);
    },
    updateTrip(state, action){
      const trip = state.trips.find((trip) => trip.id === action.payload);
      trip.country = action.payload.country;
      trip.arrivalDate = action.payload.arrivalDate;
      trip.departureDate = action.payload.departureDate;
    },
  }
})

export default travelSlice;

export const { addTrip, removeTrip, updateTrip } = travelSlice.actions;