import { createSlice } from "@reduxjs/toolkit";

export const travelSlice = createSlice({
  name: 'travel',
  initialState: {
    trips: [
      {
      id: 1, // Додайте унікальне ID
      country: 'Франція',
      arrivalDate: '2024-10-26',
      departureDate: '2024-10-30',
    }, 
  ],
    weatherData: null,
    currentWeather: null,
    country: null,
    arrivalDate: null,
    departureDate: null,
  },
  reducers: {
    addTrip(state, action) {
      state.trips.push(action.payload);
    },
    removeTrip(state, action) {
      const index = state.trips.findIndex((trip) => trip.country === action.payload);
      if (index !== -1) {
        state.trips.splice(index, 1);
      }
    },
    updateTrip(state, action) {
      const trip = state.trips.find((trip) => trip.id === action.payload);
      trip.country = action.payload.country;
      trip.arrivalDate = action.payload.arrivalDate;
      trip.departureDate = action.payload.departureDate;
    },
    setWeatherData(state, action) {
      state.weatherData = action.payload;
    },
    setCurrentWeather(state, action) {
      state.currentWeather = action.payload;
    },
    setCountry(state, action) {
      state.country = action.payload;
    },
    setArrivalDate(state, action) {
      state.arrivalDate = action.payload;
    },
    setDepartureDate(state, action) {
      state.departureDate = action.payload;
    }
  }
})

export const { addTrip, removeTrip, updateTrip, setWeatherData, setCurrentWeather, setCountry, setArrivalDate, setDepartureDate } = travelSlice.actions;