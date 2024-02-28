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

    setErrors({
      country: !country,
      arrivalDate: !arrivalDate,
      departureDate: !departureDate,
    });

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
    setIsOpen(false);
  };

  return (
    <>
      <button className="button-add" onClick={handleOpen}>Add trip</button>
      {isOpen && (
        <div className="moodal">
          <div className="modal-content">
            <div className="close-section">
              <p>Create Trip</p>
              <button className="close-button" onClick={handleClose}><span className="close">&times;</span></button>
            </div>
            <form action="">
              <div className="label-for-input">City</div>
              <input
                className="modal-input"
                type="text"
                placeholder="Please select your city"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <div className="label-for-input">Start Date</div>
              <input
                className="modal-input"
                type="date"
                placeholder="Select Date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
              <div className="label-for-input">End Date</div>
              <input
                className="modal-input"
                type="date"
                placeholder="Select Date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              /> <br />
              <div className="actions-button">
                <button className="button cancel" onClick={handleCancel}>Cancel</button>
                <button className="button save" onClick={handleSubmit}>Save</button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  )
}

export default Modal;