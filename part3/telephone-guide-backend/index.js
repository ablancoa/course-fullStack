require('dotenv').config()
const Contact = require('./modules/phonebook')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();


app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

// METODO HOME
app.get("/", (request, response) => {
  response.send('<h1>Welcome to telephone guide API</h1>')
})

// METODO GET
app.get("/api/persons", (request, response) => {
  Contact.find({}).then(result => {
    response.json(result)
  })
})

// METODO GET INFO
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

// METODO GET ID
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  person ? response.send(person) : response.status(404).end() 
})

// METODO DELETE
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = [...persons].filter(person => person.id !== id)

  response.status(204).end()
})


// METODO POST
morgan.token('data', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.post("/api/persons", (request, response) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  Contact.find({}).then(results => {
    const names = results.map(result => result.name)
    if(names.includes(body.name)){
      return response.json({
        error: "name must be unique"
      })
    }else{
      const contact = new Contact ({
        name: body.name,
        number: body.number
      })
    
      contact.save().then(savedContact => {
        console.log('Saved')
        response.json(savedContact)
      })
    }
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})