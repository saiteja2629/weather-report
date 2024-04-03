import React, { useEffect, useState } from "react";
import "./index.css";

const Weather = () => {
  const [input, setInput] = useState("");

  const [storedata, setStoredata] = useState(null);

  const fetchdata = async (param) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=8107d11ba067b0b8f1463f5f434d7187`
      );
      const data = await response.json();

      if (data) {
        setStoredata(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata("Hyderabad");
  }, []);
  const postdata = () => {
    if (input !== "") {
      fetchdata(input);
    }
  };

  const searchInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="search location here.."
          value={input}
          onChange={searchInput}
        ></input>
        <button onClick={postdata}>Search</button>
      </div>

      <div className="weather-report">
        <div className="img-temp">
          <img
            className="image"
            src="https://st.depositphotos.com/1020070/60523/v/450/depositphotos_605230396-stock-illustration-weather-forecast-cloud-rain-sun.jpg"
          ></img>
          <h1 className="temp">
            {Math.round(storedata?.main.temp - 273.5)}
            <span>&#8451;</span>
          </h1>
        </div>
        <div className="country">
          <h2>
            {storedata?.name} <span>{storedata?.sys?.country}</span>
          </h2>
        </div>

        <div className="wind-humid">
          <div className="wind-speed">
            <h3>{storedata?.wind.speed}</h3>
            <p>Wind speed</p>
          </div>
          <div className="humidity">
            <h3>{storedata?.main.humidity}</h3>
            <p>Humidity</p>
          </div>
        </div>
        <div className="descrp">
          <h3>{storedata?.weather[0].description}</h3>
          <p>Description</p>
        </div>
        <div className="visibility">
          <h3>{storedata?.visibility}</h3>
          <p>visibility</p>
        </div>
        <div className="sun">
          <div className="sunrise">
            <h3>{storedata?.sys.sunrise}</h3>
            <p>Sunrise</p>
          </div>
          <div className="sunset">
            <h3>{storedata?.sys.sunset}</h3>
            <p>Sunset</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
