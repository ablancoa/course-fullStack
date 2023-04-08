import {useState} from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleAddContact = (event) => {
    event.preventDefault();
    const isAdded = persons.includes(newName);
    isAdded ? 
    alert(`${newName.name} is already in the phonebook`) :
    setPersons(persons.concat(newName))
    
  }

  const handleNameChange = (event) => {
    setNewName({name: event.target.value})
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddContact}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  )
}

export default App;
