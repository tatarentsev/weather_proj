import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Weather.css';
import { useState, useEffect } from 'react';

export default function Weather() {
  const [state, setState] = useState({});
  const conditionArray = [
    { id: 'Clouds', icon: "bi bi-clouds-fill" },
    { id: 'Clear', icon: "bi bi-brightness-high-fill" },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=67a024cab08218f14567e8fd82852989&units=metric`);
          const data = await response.json();
          console.log(position.coords.latitude, position.coords.longitude);
          setState(
            {
              name: data.name, // имя города
              condition: data.weather[0].main, // описание погоды
              temp: (Math.round(data.main.temp)), // температура
              humidity: data.main.humidity, // влажность
              windSpeed: data.wind.speed
            } // скорость ветра
          )
        },
      )
    }
  }, [setState]);

  const weatherIcon = document.querySelectorAll('#weather_icon');

  weatherIcon.forEach(element => {
    for (let index = 0; index < conditionArray.length; index++) {
      if (conditionArray[index].id === state.condition) {
        element.className = conditionArray[index].icon;
      }
    }
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className='box'>
        <h1 className="city_name">{state.name}</h1>
        <p className="city_deg">{state.temp}&deg;</p>
        <i id='weather_icon' className="weather_icon"></i>
        <p className="city_clouds">{state.condition}</p>
      </div>
    </div>
  );
}