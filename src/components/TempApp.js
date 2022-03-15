import React, { useEffect, useState } from "react";
import { FaStreetView } from "react-icons/fa";
import "./CSS/style.css";

const TempApp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("delhi");
  const [coord, setCoord] = useState();
  const [sys, setSys] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCoord(resJson.coord);
      setCity(resJson.main);
      setWeather(resJson.weather);
      setSys(resJson.sys);
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            value={search}
            className="inputField"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        {!city || !coord || !sys || !weather ? (
          <p className="errorMsg">No data found...!!</p>
        ) : (
          <div>
            <div className="info">
              <h2 className=" location">
                <FaStreetView className="icon" />
                {search}
              </h2>
              <h1 className="temp">Temp: {city.temp}°C</h1>
              <h3 className="tempmin_max">
                Min: {city.temp_min}°C | Max : {city.temp_max}°C
              </h3>
              <h3 className="tempmin_max">
                Coords: {coord.lat}°N | {coord.lon}°E
              </h3>
              <h2 className="tempmin_max">Country: {sys.country}</h2>
            </div>
            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default TempApp;
