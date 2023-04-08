import React, {useState} from 'react'

export default function PersonForm({persons, setPersons}) {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleAddContact = (event) => {
    event.preventDefault();
    const isAdded = persons.some((person) => person.name === newName);
    isAdded ? 
    alert(`${newName} is already in the phonebook`) :
    setPersons(persons.concat({name: newName, number: newNumber}));    
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
