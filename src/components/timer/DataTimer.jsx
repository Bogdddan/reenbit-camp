import React, { useState, useEffect } from "react";
import { getCurrentWeather, getArrivalDate } from "../../redux/selectors";
import { useSelector } from "react-redux";

function DataTimer() {

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const weatherOneDay = useSelector(getCurrentWeather);
  const arrivalDate = useSelector(getArrivalDate);
  console.log('weather 1 day', weatherOneDay);
  console.log('arival', arrivalDate);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const difference = arrivalDate - now;
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>current weather</div>
      {/* {weatherOneDay.currentConditions.temp} */}
      <div>time to arrival</div>
      <div>days {days}</div>
      <div>hours {hours}</div>
      <div>minutes {minutes}</div>
      <div>seconds {seconds}</div>
    </>
  );
}

export default DataTimer;