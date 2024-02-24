import React, { useState } from "react";
import { useDispatch, } from "react-redux";

import {addTrip} from '../redux/slice';


function Modal() {
  // Modal
  const [isOpen, setIsOpen] = useState(false);
  // Date
  const [country, setCountry] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  // const trips = useSelector(getTrip);
  const dispatch = useDispatch();

  // Modal
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Date
  const handleSubmit = () => {
    dispatch(addTrip({
      country: country,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
    }));
    // Close modal
    handleClose();
  };

  return (
    <>
      <button onClick={handleOpen}>Add trip</button>
      {isOpen && (
        <div>
          <form action="">
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              type="date"
              placeholder="Arrival Date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
            <input
              type="date"
              placeholder="Departure Date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
            <button onClick={handleSubmit}>Add Trip</button>
          </form>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </>
  )
}

export default Modal;