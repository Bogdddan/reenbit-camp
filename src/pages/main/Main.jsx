import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrips } from "../../redux/selectors";
import { removeTrip } from '../../redux/slice';
import Modal from "../../components/modal/Modal";
import css from './main.module.css';

function Main() {

  const [searchCountry, setSearchCountry] = useState('');
  const [country, setCountry] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [weatherData, setWeatherData] = useState(null); // Додайте стан для weatherData

  const API_KEY = 'TVPXXTTYAYBBW7WF45YWSAJL6';

  const trips = useSelector(getTrips);
  // console.log(trips);
  const dispatch = useDispatch();

  // Delete Trip
  const handleRemoveTrip = (id) => {
    dispatch(removeTrip(id));
  };

  // Filter trips
  const filteredTrips = trips.filter(trip => trip.country.toLowerCase().includes(searchCountry.toLowerCase()));

  const handleCountryClick = (country) => {
    // console.log(country);
    setCountry(country);
  }

  // Отримайте дані погоди та відобразіть їх
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/2024-02-25/2024-02-27?key=${API_KEY}`);
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.error('Помилка отримання даних погоди:', error);
      }
    };

    if (country) {
      fetchWeather();
    }
  }, [country]);
  return (
    <div>
      <input type="text" placeholder="Search your trip" value={searchCountry} onChange={(e) => setSearchCountry(e.target.value)} />
      {filteredTrips.map((trip) => (
        <div onClick={() => handleCountryClick(trip.country)} className={css.block} key={trip.id}>
          <h1>{trip.country}</h1>
          <p>Date of arrival:{trip.arrivalDate}</p>
          <p>Date of departure:{trip.departureDate}</p>
          <button onClick={() => handleRemoveTrip(trip.country)}>Remove</button>
        </div>
      ))}
      {/*  displaying weather data in current city */}
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.currentConditions.temp}</p>
          <p>Feels like: {weatherData.currentConditions.feelslike}</p>
          <p>Humidity: {weatherData.currentConditions.humidity}</p>
          {weatherData.days.map((day) => (
            <div>{day.temp}</div>
          ))}
        </div>
      )}
      <Modal />
    </div>
  );
}


export default Main;