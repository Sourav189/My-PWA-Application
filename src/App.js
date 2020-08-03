import React from "react";

import { fetchWeather } from "./api/fetchWeather";
import "./styles.css";

export default function App() {
  const [query, setQuery] = React.useState("");

  const [weather, setWeather] = React.useState({});

  const search = async e => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data);
      setQuery("");
    }
  };
  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search ..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div>
            <h3>
              Feels like {Math.round(weather.main.feels_like)}
              <sup>&deg;C</sup>
            </h3>
            <h3> Humidity {weather.main.humidity}%</h3>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${
                weather.weather[0].icon
              }@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
