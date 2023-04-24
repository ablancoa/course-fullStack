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
      username: 'X',
      name: 'Superuser',
      password: 'XXXXXXXX',
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