export const getTrips = (state) => state.travel.trips;

export const getTripById = (state, id) => {
    return state.travel.trips.find((trip) => trip.id === id);
};

export const getWeatherData = (state) => state.travel.weatherData;

export const getCurrentWeather = (state) => state.travel.currentWeather;

export const getCountry = (state) => state.travel.country;
export const getArrivalDate = (state) => state.travel.arrivalDate;
export const getDepartureDate = (state) => state.travel.departureDate;