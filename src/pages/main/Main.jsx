import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTrip } from '../../redux/slice';
import { getTrips } from "../../redux/selectors";
import { getWeatherData, getCountry, getArrivalDate, getDepartureDate } from "../../redux/selectors";
import { setWeatherData, setCountry, setArrivalDate, setDepartureDate } from "../../redux/slice";
import DataTimer from "../../components/timer/DataTimer";
import Modal from "../../components/modal/Modal";
import './main.css';

function Main() {

  const [searchCountry, setSearchCountry] = useState('');
  // unvalid
  // const API_KEY = 'TVPXXTTYAYBBW7WF45YWSAJL6';
  // valid
  // const API_KEY = 'JL766J7HLBJXJYMRDBJJZSCD6';

  const trips = useSelector(getTrips);
  // console.log(trips);
  const country = useSelector(getCountry);
  const arrivalDate = useSelector(getArrivalDate);
  const departureDate = useSelector(getDepartureDate);
  const dispatch = useDispatch();

  // Delete Trip
  const handleRemoveTrip = (id) => {
    dispatch(removeTrip(id));
  };

  // Filter trips
  const filteredTrips = trips.filter(trip => trip?.country?.toLowerCase().includes(searchCountry.toLowerCase()));


  // Отримайте дані погоди та відобразіть їх
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/${arrivalDate}/${departureDate}?key=TVPXXTTYAYBBW7WF45YWSAJL6`);
        const data = await response.json();

        // console.log(data);
        dispatch(setWeatherData(data));
      } catch (error) {
        console.error('Помилка отримання даних погоди:', error);
      }
    };

    fetchWeather();

  }, [country, arrivalDate, departureDate, dispatch]);


  const handleCountryClick = (trip) => {
    // console.log(trip.country);
    dispatch(setCountry(trip.country));
    dispatch(setArrivalDate(trip.arrivalDate));
    dispatch(setDepartureDate(trip.departureDate));
  }


  const weatherData = useSelector(getWeatherData);

  return (
    <div className="windows">
      <div className="container">
        <input className="search-input" type="text" placeholder="Search your trip" value={searchCountry} onChange={(e) => setSearchCountry(e.target.value)} />
        {trips.length === 0 && (
          <p className="empty-list">Подорожі не знайдені</p>
        )}
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
        <div>
          {weatherData && (
            <ul className="weatherList">
              {weatherData.days.map((day) => (
                <li key={day.datetime}>
                  <div>{day.datetime}</div>
                  <div>
                    {Math.round((day.tempmax - 35) * 10) / 10}/{Math.round(
                      (day.tempmin - 35) * 10
                    ) / 10} °C
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <DataTimer />
    </div>
  );
}


export default Main;
