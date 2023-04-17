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

// METODO GET - DOne
app.get("/api/persons", (request, response) => {
  Contact.find({}).then(result => {
    response.json(result)
  })
})

// METODO GET INFO - Done
app.get("/info", (request,response)=> {
  const date = new Date()

  // Count all documents in a mongo db collection
  Contact.countDocuments().then((count) =>{
    response.send(`
      <div>
        <p>Phonebook has info for ${count} peoples</p>
        <p>${date}</p>
      </div>
    `)
  })

  
})

// METODO GET ID
app.get("/api/persons/:id", (request, response, next) => {
  Contact.findById(request.params.id)
  .then(result => {
    if(result){
      response.json(result)
    }else{
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

// METODO DELETE - Done
app.delete("/api/persons/:id", (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
})


// METODO POST - Done
morgan.token('data', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.post("/api/persons", (request, response) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  const contact = new Contact ({
    name: body.name,
    number: body.number
  })

  contact.save()
  .then(savedContact => {
    console.log('Saved')
    response.json(savedContact)
  })
  .catch(error => response.status(400).json({error: error.message}))

  // const contact = new Contact({
  //   name: body.name,
  //   number: body.number
  // }

  // Contact.find({}).then(results => {
  //   const names = results.map(result => result.name)
  //   if(names.includes(body.name)){
  //     return response.json({
  //       error: "name must be unique"
  //     })
  //   }else{
  //   }
  // })
})

// METODO PUT - Done
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  const contact = {
    name: body.name,
    number: body.number
  }

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})