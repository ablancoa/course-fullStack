import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CountryDetail({country}) {
  const [weather, setWeather] = useState()
  
  useEffect(() =>{
    const params = {
      access_key: process.env.REACT_APP_WEATHER_KEY,
      query: country.name.official
    }
    const fetchData = async () => {
      await axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data;
        setWeather(apiResponse)
      }).catch(error => {
        console.log(error);
      });
    }
    fetchData()
    
  },[country])

  return (
    <div>
      <h1>{country.name.official}</h1>
      <p>capital {country.capital[0]} </p>
      <p>population {country.population} </p>
      <h2>languajes</h2>
      <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.name.official}</h2>
      {weather && 
      <>
        <h4>temperature: {weather.current.temperature}</h4>
        <img src={weather.current.weather_icons[0]} alt='icon' />
        <h4>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</h4>
      </>}
    </div>
  )
}
