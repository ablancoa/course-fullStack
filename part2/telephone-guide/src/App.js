import {useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState()
  const [nameToShow, setNameToShow] = useState([])

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  },[])

  const handleFilter = (event) => {
    const filteredName = [...persons].filter(person =>(person.name).toLowerCase().includes((event.target.value).toLowerCase()))
    setNameToShow(filteredName);
  }

  const listToShow = nameToShow.length !== 0 ? nameToShow : persons

  return (
    <div>
      {persons && 
      <>
        <h2>Phonebook</h2>
        <Filter handleFilter={handleFilter} />
        <h2>add a new</h2>
        <PersonForm persons={persons} setPersons={setPersons} />
        <h2>Numbers</h2>
        <Persons listToShow={listToShow} />
      </>}
    </div>
  )
}

export default App;
