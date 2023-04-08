import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [nameToShow, setNameToShow] = useState([])

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

  const handleFilter = (event) => {
    const filteredName = [...persons].filter(person =>(person.name).toLowerCase().includes((event.target.value).toLowerCase()))
    setNameToShow(filteredName);
  }

  const listToShow = nameToShow.length !== 0 ? nameToShow : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input type='text' onChange={handleFilter} />
      </div>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      <div>
        {listToShow.map((person) => (
          <p key={person.name}>{person.name} {`${(person.number).toString().substring(0,3)}-${(person.number).toString().substring(3,5)}-${(person.number).toString().substring(5)}`}</p>
        ))}
      </div>
    </div>
  )
}

export default App;
