import {useState} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [nameToShow, setNameToShow] = useState([])

  const handleFilter = (event) => {
    const filteredName = [...persons].filter(person =>(person.name).toLowerCase().includes((event.target.value).toLowerCase()))
    setNameToShow(filteredName);
  }

  const listToShow = nameToShow.length !== 0 ? nameToShow : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons listToShow={listToShow} />
    </div>
  )
}

export default App;
