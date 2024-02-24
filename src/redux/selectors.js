export const getTrips = (state) => state.travel.trips;

export const getTripById = (state, id) => {
    return state.travel.trips.find((trip) => trip.id === id);
};