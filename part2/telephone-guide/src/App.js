import {useState, useEffect} from 'react';
import phoneList from './services/phoneList'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState()
  const [nameToShow, setNameToShow] = useState([])
  const [notification, setNotification] = useState(null)

  const URL = 'http://localhost:3001/persons'
  const {getContacts, deleteContact, addContact, updateContact} = phoneList

  useEffect(() => {
    getContacts(URL)
    .then(initialContacts => setPersons(initialContacts))
    .catch(error => console.log(error))
  },[])

  const launchNotification = (action, name) => {
    setNotification({action, name})
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleFilter = (event) => {
    const filteredName = [...persons].filter(person =>(person.name).toLowerCase().includes((event.target.value).toLowerCase()))
    setNameToShow(filteredName);
  }

  const handleDelete = (person) => {
    if (window.confirm('Delete contact')){
      deleteContact(URL, person.id)
      .then(
        () => {
          setPersons(persons.filter(contact => contact.id !== person.id))
          launchNotification('Delete', person.name)
        }
        )
      .catch(error => console.log(error))
    }
  }

  const addToPhonelist = (person) => {
    addContact(URL, person)
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
      launchNotification('Added', person.name)
    }) 
    .catch(error => console.log(error))
  }

  const updatedContact = (user,newNumber) => {
    const updatedUser = {...user, number: newNumber}
    updateContact(URL, updatedUser.id, updatedUser)
    .then(response => {
      setPersons(persons.map(person => person.id !== user.id ? person : response))
      launchNotification('Updated', user.name)
    })
    .catch(error => console.log(error))
  }

  const listToShow = nameToShow.length !== 0 ? nameToShow : persons

  return (
    <div>
      {persons && 
      <>
        <h2>Phonebook</h2>
        {notification !== null && <Notification action={notification.action} name={notification.name}/>}
        <Filter handleFilter={handleFilter} />
        <h2>add a new</h2>
        <PersonForm persons={persons} updatedContact={updatedContact} addToPhonelist={addToPhonelist}/>
        <h2>Numbers</h2>
        <Persons listToShow={listToShow} baseURL={URL} handleDelete={handleDelete}/>
      </>}
    </div>
  )
}

export default App;
