import React, {useState} from 'react';
import CountryDetail from './CountryDetail';

export default function CountryList({countries}) {

  const [indexToShow, setIndexToShow] = useState(null)

  const handleShow = (name) => {
    const index = countries.findIndex(item => item.name.official === name);
    setIndexToShow(index)
  }
  return (
    <div>
      <ul>
        {countries.map((country) =>
        <div key={country.name.official}>
          <li>{country.name.official} <button onClick={() => handleShow(country.name.official)}>show</button></li>
        </div>
        )}
      </ul>
      {indexToShow != null ? <CountryDetail country={countries[indexToShow]} /> : <p>Set show</p>}
 
    </div>
  )
}
