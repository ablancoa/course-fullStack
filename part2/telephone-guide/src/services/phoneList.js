import axios from 'axios';

const getContacts = async (baseURL) => {
  const request = await axios.get(baseURL)
  return request.data
}

const addContact = async (baseURL, object) => {
  const request = await axios.post(baseURL, object);
  return request.data
}

const deleteContact = async (baseURL, id) => {
  const request = await axios.delete(`${baseURL}/${id}`)
  return request.status
}

const updateContact = async (baseURL, id, number) => {
  const request = await axios.put(`${baseURL}/${id}`, number)
  return request.data
}

export default {getContacts, addContact, deleteContact, updateContact}