const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid username o password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }
// Aca se esta creando el token que tiene la informacion del username y el id firmado digitalmente y guardada en la variable SECRET
  const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60})

  response
  .status(200)
  .send({token, username: user.username, name: user.name})
})

module.exports = loginRouter