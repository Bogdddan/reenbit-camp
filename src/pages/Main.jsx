import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrips } from "../redux/selectors";
import removeTrip from '../redux/slice';
import updateTrip from '../redux/slice';
// import store from "../redux/store";
// import { useDispatch } from "react-redux";
import Modal from "../components/Modal";

function Main() {

  const [country, setCountry] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const trips = useSelector(getTrips);
  const dispatch = useDispatch();
  console.log(setCountry, setDepartureDate, setArrivalDate);

  const handleRemoveTrip = (id) => {
    dispatch(removeTrip(id));
  };
  const handleUpdateTrip = (id) => {
    dispatch(
      updateTrip({
        id,
        country,
        arrivalDate,
        departureDate,
      })
    );
  };


  return (
    <div>
      {trips.map((trip) => (
        <div key={trip.id}>
          <h1>{trip.country}</h1>
          <p>{trip.arrivalDate}</p>
          <p>{trip.departureDate}</p>
          <button onClick={() => handleRemoveTrip(trip.id)}>Remove</button>
          <button onClick={() => handleUpdateTrip(trip.id)}>Update</button>
        </div>
      ))}
      <Modal />
    </div>
  );
}

export default Main;