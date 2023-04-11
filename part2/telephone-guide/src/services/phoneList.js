import axios from 'axios';

const getContacts = async (baseURL) => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const addContact = async (baseURL, object) => {
  const request = axios.post(baseURL, object);
  return request.then(response => response.data)
}

export default {getContacts, addContact}