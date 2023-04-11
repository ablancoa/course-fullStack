import React, {useState} from 'react';
import axios from 'axios'

export default function PersonForm({persons, setPersons}) {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addToPhonelist = (person) => {
    axios.post('http://localhost:3001/persons', person)
  }


  const handleAddContact = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const isAdded = persons.some((person) => person.name === newName);

    if(isAdded) {
      alert(`${newName} is already in the phonebook`)
    }
    else{
      addToPhonelist(newPerson)
      setPersons(persons.concat(newPerson))    
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
