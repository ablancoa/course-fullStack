import React, {useState} from 'react';
import phoneList from '../services/phoneList';

export default function PersonForm({persons, setPersons, baseURL}) {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addToPhonelist = (person) => {
    phoneList.addContact(baseURL, person)
    .then(newPerson => setPersons(persons.concat(newPerson))) 
    .catch(error => console.log(error))
  }

  const updateContact = (user,newNumber) => {
    const updatedUser = {...user, number: newNumber}
    phoneList.updateContact(baseURL, updatedUser.id, updatedUser)
    .then(response => setPersons(persons.map(person => person.id !== user.id ? person : response)))
    .catch(error => console.log(error))
  }

  const handleAddContact = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const isAdded = persons.some((person) => person.name === newName);

    if(isAdded) {
      const user = persons.find((person) => person.name === newName)
      updateContact(user, newNumber)
    }
    else{
      addToPhonelist(newPerson)
          
    }
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
