import React from 'react';

export default function Persons({listToShow, handleDelete}) {

  return (
    <div>
      {listToShow.map((person) => (
        <p key={person.name}>{person.name} {`${(person.number).toString().substring(0,3)}-${(person.number).toString().substring(3,5)}-${(person.number).toString().substring(5)}`} <button onClick={() => handleDelete(person)}>deleted</button> </p>
      ))}
    </div>
  )
}
