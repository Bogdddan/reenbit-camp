import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrips } from "../../redux/selectors";
import { removeTrip } from '../../redux/slice';
import Modal from "../../components/modal/Modal";
import { getWeatherData, getCurrentWeather } from "../../redux/selectors";
import { setWeatherData, setCurrentWeather } from "../../redux/slice";
import DataTimer from "../../components/timer/DataTimer";
import './main.css';

function Main() {

  const [searchCountry, setSearchCountry] = useState('');
  const [country, setCountry] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  // unvalid
  // const API_KEY = 'TVPXXTTYAYBBW7WF45YWSAJL6';
  // valid
  const API_KEY = 'JL766J7HLBJXJYMRDBJJZSCD6';

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
        // weather for now // https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[city]/today?unitGroup=metric&amp;include=days&amp;key=YOUR_API_KEY
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/${arrivalDate}/${departureDate}?key=${API_KEY}`);
        const data = await response.json();

        console.log(data);
        dispatch(setWeatherData(data));
        if (country) {
          fetchWeather();
        }
      } catch (error) {
        console.error('Помилка отримання даних погоди:', error);
      }
    };

    if (country) {
      fetchWeather();
    }
  }, [country, arrivalDate, departureDate, dispatch]);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        // weather for now // https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/today?unitGroup=metric&amp;include=days&amp;key=${API_KEY}
        const currentWeatherresponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/today?key=${API_KEY}`);
        const currentWeatherdata = await currentWeatherresponse.json();

        dispatch(setCurrentWeather(currentWeatherdata));
        if (country) {
          fetchCurrentWeather();
        }
      } catch (error) {
        console.error('Помилка отримання даних погоди:', error);
      }
    };

    if (country) {
      fetchCurrentWeather();
    }
  }, [country, dispatch])

  const weatherData = useSelector(getWeatherData);
  const currentWeather = useSelector(getCurrentWeather);
  console.log('cuurent weather', currentWeather);

  return (
    <div className="windows">
      <div className="container">
        <input className="search-input" type="text" placeholder="Search your trip" value={searchCountry} onChange={(e) => setSearchCountry(e.target.value)} />
        <div className="trips-list">
          {filteredTrips.map((trip) => (
            <div onClick={() => handleCountryClick(trip)} className='block' key={trip.id}>
              <h1>{trip.country}</h1>
              <div>
                <span>{trip.arrivalDate}</span>
                <span>{trip.departureDate}</span>
              </div>
              <button onClick={() => handleRemoveTrip(trip.country)}>Remove</button>
            </div>
          ))}
          <Modal />
        </div>
        {/*  displaying weather data in current city */}
        {weatherData && (
          <span>
            {weatherData.days.map((day) => (
              <div>{day.temp}</div>
            ))}
          </span>
        )}
      </div>
      <div>
        <DataTimer />
      </div>
    </div>
  );
}


export default Main;