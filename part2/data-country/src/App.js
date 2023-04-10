import { useState, useEffect } from "react";
import axios from 'axios';
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])
  const [countryToShow, setCountryToShow] = useState([])
  const API = 'https://restcountries.com/v3.1/all';

  useEffect(()=> {
    axios
    .get(API)
    .then(response => setCountries(response.data))
  })

  const handleSearch = (event) => {
    const filteredName = [...countries].filter(country =>(country.name.official).toLowerCase().includes((event.target.value).toLowerCase()));
    const listOfNames = filteredName.map(item => {
      return {
        ...item,
        show: false
      }
    })
    listOfNames.length === countries.length ? setCountryToShow([]) : setCountryToShow(listOfNames)
  }

  return (
    <>
      <div className="App">
        <p>find country: <input type="text" onChange={handleSearch}/></p>
      </div>
      {countryToShow.length > 10 ? <p>To manny matches, specify another filter</p> : <CountryList countries={countryToShow}/>}
    </>
  );
}

export default App;
