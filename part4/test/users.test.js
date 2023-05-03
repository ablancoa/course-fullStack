const supertest = require('supertest')
// const bcrypt = require('bcrypt')
const helper = require('./test_helper')
// const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in db', () => {
  test('not valid users are not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'x',
      name: 'x',
      password: 'x',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('get all users', () => {
  test('all users are returned', async () => {
    const usersAtStart = await helper.usersInDb()

    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(usersAtStart.length)
    console.log(response.body)
  })
})
