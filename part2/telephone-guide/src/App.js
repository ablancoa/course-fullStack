import {useState} from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: 999111111 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleAddContact = (event) => {
    event.preventDefault();
    const isAdded = persons.some((person) => person.name === newName);
    isAdded ? 
    alert(`${newName} is already in the phonebook`) :
    setPersons(persons.concat({name: newName, number: newNumber}))
    
  }

  const handleNameChange = (event) => {
    setNewName( event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddContact}>
        <div>
          name: <input type='text' onChange={handleNameChange}/>
          number: <input type='number' onChange={handleNumberChange} max={9}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name} {`${(person.number).toString().substring(0,3)}-${(person.number).toString().substring(3,5)}-${(person.number).toString().substring(5)}`}</p>
        ))}
      </div>
    </div>
  )
}

export default App;
