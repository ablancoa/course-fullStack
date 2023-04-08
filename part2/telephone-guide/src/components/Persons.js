import React from 'react'

export default function Persons({listToShow}) {
  return (
    <div>
      {listToShow.map((person) => (
        <p key={person.name}>{person.name} {`${(person.number).toString().substring(0,3)}-${(person.number).toString().substring(3,5)}-${(person.number).toString().substring(5)}`}</p>
      ))}
    </div>
  )
}
