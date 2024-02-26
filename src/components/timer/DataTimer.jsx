import React from "react";
import { getCurrentWeather } from "../../redux/selectors";
import { useSelector } from "react-redux";

function DataTimer() {
  const weatherData = useSelector(getCurrentWeather);
  // console.log('weather data', weatherData);

  return (
    <>
    <div>current weather</div>
      {/* {weatherData.currentConditions.temp} */}
    </>
  );
}

export default DataTimer;