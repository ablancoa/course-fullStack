import {useState, useEffect} from 'react';
import phoneList from './services/phoneList'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState()
  const [nameToShow, setNameToShow] = useState([])

  const URL = 'http://localhost:3001/persons'
  const {getContacts, deleteContact} = phoneList

  useEffect(() => {
    getContacts(URL)
    .then(initialContacts => setPersons(initialContacts))
    .catch(error => console.log(error))
  },[])

  const handleFilter = (event) => {
    const filteredName = [...persons].filter(person =>(person.name).toLowerCase().includes((event.target.value).toLowerCase()))
    setNameToShow(filteredName);
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete contact')){
      phoneList.deleteContact(URL, id)
      .then(setPersons(persons.filter(contact => contact.id !== id)))
      .catch(error => console.log(error))
    }
  }

  const listToShow = nameToShow.length !== 0 ? nameToShow : persons

  return (
    <div>
      {persons && 
      <>
        <h2>Phonebook</h2>
        <Filter handleFilter={handleFilter} />
        <h2>add a new</h2>
        <PersonForm persons={persons} setPersons={setPersons} baseURL={URL}/>
        <h2>Numbers</h2>
        <Persons listToShow={listToShow} baseURL={URL} handleDelete={handleDelete}/>
      </>}
    </div>
  )
}

export default App;
