import React from 'react'

export default function CountryDetail({country}) {
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
    </div>
  )
}
