import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrips } from "../../redux/selectors";
import { removeTrip } from '../../redux/slice';
import Modal from "../../components/modal/Modal";
import './main.css';

function Main() {

  const [searchCountry, setSearchCountry] = useState('');
  const [country, setCountry] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = 'TVPXXTTYAYBBW7WF45YWSAJL6';
  // const API_KEY = '';

  const trips = useSelector(getTrips);
  // console.log(trips);
  const dispatch = useDispatch();

  // Delete Trip
  const handleRemoveTrip = (id) => {
    dispatch(removeTrip(id));
  };

  // Filter trips
  const filteredTrips = trips.filter(trip => trip.country.toLowerCase().includes(searchCountry.toLowerCase()));

  const handleCountryClick = (trip) => {
    // console.log(trip.country);
    setCountry(trip.country);
    setArrivalDate(trip.arrivalDate);
    setDepartureDate(trip.departureDate);
  }

  // Отримайте дані погоди та відобразіть їх
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/${arrivalDate}/${departureDate}?key=${API_KEY}`);
        const data = await response.json();
        // console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.error('Помилка отримання даних погоди:', error);
      }
    };

    if (country) {
      fetchWeather();
    }
  }, [country, arrivalDate, departureDate]);

  console.log('weather', weatherData);
  return (
    <div>
      <input type="text" placeholder="Search your trip" value={searchCountry} onChange={(e) => setSearchCountry(e.target.value)} />
      <div className="trips-list">
        {filteredTrips.map((trip) => (
          <div onClick={() => handleCountryClick(trip)} className='block' key={trip.id}>
            <h1>{trip.country}</h1>
            <p>Date of arrival:{trip.arrivalDate}</p>
            <p>Date of departure:{trip.departureDate}</p>
            <button onClick={() => handleRemoveTrip(trip.country)}>Remove</button>
          </div>
        ))}
        <Modal />
      </div>
      {/*  displaying weather data in current city */}
      {weatherData && (
        <div>
          {weatherData.days.map((day) => (
            <div>{day.temp}</div>
          ))}
        </div>
      )}
    </div>
  );
}


export default Main;