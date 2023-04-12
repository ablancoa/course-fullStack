const express = require('express');
const app = express();

const persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "95-656589",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "53-56656165",
    "id": 3
  },
  {
    "name": "MAry Poppendick",
    "number": "1-515-5161",
    "id": 4
  }
]

app.use(express.json())

app.get("/", (request, response) => {
  response.send('<h1>Welcome to telephone guide API</h1>')
})

app.get("/api/persons", (request, response) => {
  response.send(persons)
})

app.get("/info", (request,response)=> {
  const date = new Date()
  const totalContacts = persons.length

  response.send(`
  <div>
    <p>Phonebook has info for ${totalContacts} peoples</p>
    <p>${date}</p>
  </div>
  `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})