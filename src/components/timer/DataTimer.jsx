import React, { useState, useEffect } from "react";
import { getCurrentWeather, getArrivalDate, getCountry } from "../../redux/selectors";
import { setCurrentWeather } from "../../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import './dataTimer.css';

function DataTimer() {

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  const arrivalDate = useSelector(getArrivalDate);
  const country = useSelector(getCountry);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetcCurrentWeather = async () => {
      try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/today?key=JL766J7HLBJXJYMRDBJJZSCD6`);
        const data = await response.json();
        console.log(data);
        dispatch(setCurrentWeather(data));
      } catch (error) {
        console.error('Помилка отримання даних погоди:', error);
      }
    };

    fetcCurrentWeather();

  }, [country, dispatch]);

  const currentWeatherData = useSelector(getCurrentWeather);


  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const arrivalTime = new Date(arrivalDate).getTime();
      const difference = arrivalTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const seconds = Math.floor(difference / 1000) % 60;
      const minutes = Math.floor(difference / (1000 * 60)) % 60;
      const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);
    return () => clearInterval(interval);
  }, [arrivalDate]);

  return (
    <div className="timer">
      <div>{currentWeatherData?.days[0].datetime}</div>
      <div>{currentWeatherData?.resolvedAddress}</div>
      <div>{Math.round(
        (currentWeatherData?.days[0].temp - 35) * 10
      ) / 10}
        °C</div>
      <ul className="timer-list">
        <li> days <br />{days}</li>
        <li>hours <br /> {hours}</li>
        <li> minutes <br /> {minutes}</li>
        <li> seconds <br /> {seconds}</li>
      </ul>

    </div>
  );
}

export default DataTimer;