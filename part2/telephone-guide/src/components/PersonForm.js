import React, {useState} from 'react';
import phoneList from '../services/phoneList';

export default function PersonForm({persons, updatedContact, addToPhonelist}) {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')



  const handleAddContact = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }

    addToPhonelist(newPerson)
    // const isAdded = persons.some((person) => person.name === newName);

    // if(isAdded) {
    //   const user = persons.find((person) => person.name === newName)
    //   updatedContact(user, newNumber)
    // }
    // else{
          
    // }
  }

  const handleNameChange = (event) => {
    setNewName( event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={handleAddContact}>
      <div>
        name: <input type='text' onChange={handleNameChange}/>
      </div>
      <div>
        number: <input type='number' onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
