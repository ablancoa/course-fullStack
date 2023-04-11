import React from 'react';
import phoneList from '../services/phoneList';

export default function Persons({listToShow, baseURL}) {
  const handleDelete = (id) => {
    if (window.confirm('Delete contact')){
      phoneList.deleteContact(baseURL, id)
      .then(status => console.log(status))
    }
  }
  return (
    <div>
      {listToShow.map((person) => (
        <p key={person.name}>{person.name} {`${(person.number).toString().substring(0,3)}-${(person.number).toString().substring(3,5)}-${(person.number).toString().substring(5)}`} <button onClick={() => handleDelete(person.id)}>deleted</button> </p>
      ))}
    </div>
  )
}
