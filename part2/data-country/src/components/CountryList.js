import React from 'react';
import CountryDetail from './CountryDetail';

export default function CountryList({countries}) {
  return (
    <div>
      {countries.length !== 1 ? (
      <ul>
        {countries.map(country => <li key={country.name.official}>{country.name.official}</li>)}
      </ul>
      ): <CountryDetail country={countries[0]} />}
    </div>
  )
}
