import React, { useEffect } from "react";
import { getWeatherData } from "../../redux/selectors";
import { useSelector } from "react-redux";

function DataTimer() {
  const weatherData = useSelector(getWeatherData);

  return (
    <>
      {weatherData ? (
        <>
          {/* Відображення таймера та погодних даних */}
        </>
      ) : (
        <p>Завантаження погодних даних...</p>
      )}
    </>
  );
}

export default DataTimer;