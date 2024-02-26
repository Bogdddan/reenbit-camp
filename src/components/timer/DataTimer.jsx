import React from "react";
import { getWeatherData } from "../../redux/selectors";
import { useSelector } from "react-redux";

function DataTimer() {
  const weatherData = useSelector(getWeatherData);
  console.log('weather data', weatherData);

  return (
    // <>
    //   {weatherData ? (
    //     <>
    //       {/* Відображення таймера та погодних даних */}
    //     </>
    //   ) : (
    //     <p>Завантаження погодних даних...</p>
    //   )}
    // </>
    <>fdffd</>
  );
}

export default DataTimer;