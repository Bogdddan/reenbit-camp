import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import { addTrip } from '../../redux/slice';
import './modal.css';


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
  // Are all fields filled in?
  const [errors, setErrors] = useState({
    country: false,
    arrivalDate: false,
    departureDate: false,
  })

  // Date
  const handleSubmit = () => {

    const errors = {
      country: !country,
      arrivalDate: !arrivalDate,
      departureDate: !departureDate,
    };

    const hasErrors = Object.values(errors).some((error) => error);

    if (hasErrors) {
      setErrors(errors);
      alert('some field may not be filled')
      return;
    }


    const arrivalDateObject = new Date(arrivalDate);
    const departureDateObject = new Date(departureDate);

    if (arrivalDateObject >= departureDateObject) {
      alert('Departure date cannot be earlier than arrival date!')
      return
    }

    const differenceInDays = Math.floor((departureDateObject - arrivalDateObject) / (1000 * 60 * 60 * 24));
    if (differenceInDays > 15) {
      alert('Trip cannot be longer than 15 days!')
      return
    }


    dispatch(addTrip({
      country: country,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
    }));
    handleClose();
  };

  const handleCancel = () => {

  };

  return (
    <>
      <button onClick={handleOpen}>Add trip</button>
      {isOpen && (
        <div className="moodal">
          <div className="modal-content">
            <p>Create Trip</p>
            <form action="">
              <div>City</div>
              <input
                type="text"
                placeholder="Please select your city"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <div>Start Date</div>
              <input
                type="date"
                placeholder="Select Date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
              <div>End Date</div>
              <input
                type="date"
                placeholder="Select Date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
              <button onClick={handleSubmit}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </form>
            <button className="close" onClick={handleClose}>&times;</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal;