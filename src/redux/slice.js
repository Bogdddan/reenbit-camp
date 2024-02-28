import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const travelSlice = createSlice({
  name: 'travel',
  initialState: {
    trips: [],
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

export const fetchWeather = createAsyncThunk(
  'travel/fetchWeather',
  async (args, { getState }) => {
    const { country, arrivalDate, departureDate } = getState().travel;
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/${arrivalDate}/${departureDate}?key=JL766J7HLBJXJYMRDBJJZSCD6`);
    const data = await response.json();
    console.log(data);
    setWeatherData(data);
    return data;
  }
);

export const fetchCurrentWeather = createAsyncThunk(
  'travel/fetchCurrentWeather',
  async (args, { getState }) => {
    const { country } = getState().travel;
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/today?key=JL766J7HLBJXJYMRDBJJZSCD6`);
    const data = await response.json();
    console.log(data);
    setCurrentWeather(data);
    return data;
  }
);

export const { addTrip, removeTrip, updateTrip, setWeatherData, setCurrentWeather, setCountry, setArrivalDate, setDepartureDate } = travelSlice.actions;