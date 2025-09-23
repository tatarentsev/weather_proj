import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Weather.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';

export default function Weather( {cityName} ) {

    const [state, setState] = useState({});
      const conditionArray = [
        {id: 'Clouds', icon: "bi bi-clouds-fill"},
        {id: 'Clear', icon: "bi bi-brightness-high-fill"}
      ]
      
      useEffect(() => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0295fdc4ce9abb29970fffef06a0775b&units=metric`;
        axios.get(apiUrl).then((resp) => {
          console.log(resp);
          setState(
            {name: resp.data.name, // имя города
            condition: resp.data.weather[0].main, // описание погоды
            temp: (Math.round(resp.data.main.temp)), // температура
            humidity: resp.data.main.humidity, // влажность
            windSpeed: resp.data.wind.speed}) // скорость ветра
        });
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
        <div style={{display: "flex", justifyContent: "center"}}>
            <div className='box'>
                <h1 className="city_name">{state.name}</h1>
                <p className="city_deg">{state.temp}&deg;</p>
                <h1 id='weather_icon' class="weather_icon"></h1>
                <p className="city_clouds">{state.condition}</p>
            </div>
        </div>
    );
};

