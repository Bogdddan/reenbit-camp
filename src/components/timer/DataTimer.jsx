import React, { useState, useEffect } from "react";
import { getCurrentWeather, getArrivalDate, getCountry, getDepartureDate } from "../../redux/selectors";
import { setCurrentWeather } from "../../redux/slice";
import { useDispatch, useSelector } from "react-redux";

function DataTimer() {

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // const [weatherOneDay, setWeatherOneDay] = useState('');
  const arrivalDate = useSelector(getArrivalDate);
  const departureDate = useSelector(getDepartureDate);
  const country = useSelector(getCountry);

  const dispatch = useDispatch();
  // console.log('weather 1 day', weatherOneDay);
  // useEffect()
  console.log('arival', arrivalDate.typeOf);

    useEffect(() => {
      const fetcCurrentWeather = async () => {
        try {
          const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/today?key=JL766J7HLBJXJYMRDBJJZSCD6`);
          const data = await response.json();
          dispatch(setCurrentWeather(data));
        } catch (error) {
          console.error('Помилка отримання даних погоди:', error);
        }
      };
  
      fetcCurrentWeather();
  
      // dispatch(fetchWeather());
    }, [country, arrivalDate, departureDate, dispatch]);

    const currentWeatherData = useSelector(getCurrentWeather);
    // console.log(currentWeatherData);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const difference = arrivalDate - now;
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (!arrivalDate) return;
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [arrivalDate]);

  return (
    <>
      <div>current weather</div>
      {currentWeatherData.days[0].temp}
      {/* Assuming the relevant logic for displaying weatherOneDay is here */}
        <>
          <div>time to arrival</div>
          <div>days {days}</div>
          <div>hours {hours}</div>
          <div>minutes {minutes}</div>
          <div>seconds {seconds}</div>
        </>
      
    </>
  );
}

export default DataTimer;