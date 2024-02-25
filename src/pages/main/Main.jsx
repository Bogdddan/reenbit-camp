import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrips } from "../../redux/selectors";
import { removeTrip } from '../../redux/slice';
import Modal from "../../components/Modal";
import css from './main.module.css';

function Main() {

  const trips = useSelector(getTrips);
  console.log(trips);
  const dispatch = useDispatch();

  const handleRemoveTrip = (id) => {
    dispatch(removeTrip(id));
  };


  return (
    <div>
      {trips.map((trip) => (
        <div className={css.block} key={trip.id}>
          <h1>{trip.country}</h1>
          <p>Date of arrival:{trip.arrivalDate}</p>
          <p>Date of departure:{trip.departureDate}</p>
          <button onClick={() => handleRemoveTrip(trip.id)}>Remove</button>
        </div>
      ))}
      <Modal />
    </div>
  );
}

export default Main;