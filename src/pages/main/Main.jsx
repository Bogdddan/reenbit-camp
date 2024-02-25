import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrips } from "../../redux/selectors";
import { removeTrip } from '../../redux/slice';
import Modal from "../../components/Modal";
import css from './main.module.css';

function Main() {

  const API_KEY = 'TVPXXTTYAYBBW7WF45YWSAJL6';

  const trips = useSelector(getTrips);
  console.log(trips);
  const dispatch = useDispatch();

  const handleRemoveTrip = (id) => {
    dispatch(removeTrip(id));
  };

  const handleCountryClick = (country) => {
    console.log(country);
  }

  // test api
  useEffect(() => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/kalush/2024-02-25/2024-02-27?key=${API_KEY}`)
      .then(r => r.json())
      .then(data => console.log(data))
  }, [])

  return (
    <div>
      {trips.map((trip) => (
        <div onClick={() => handleCountryClick(trip.country)} className={css.block} key={trip.id}>
          <h1>{trip.country}</h1>
          <p>Date of arrival:{trip.arrivalDate}</p>
          <p>Date of departure:{trip.departureDate}</p>
          <button onClick={() => handleRemoveTrip(trip.id)}>Remove</button>
        </div>
      ))}
      
        <div>Country {}</div>
      
      <Modal />
    </div>
  );
}

export default Main;