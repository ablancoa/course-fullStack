const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBlogs = helper.blogs

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let noteObject = new Blog(blog)
    await noteObject.save()
  }
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.status).toBe(200)
  expect(response.type).toMatch(/application\/json/)
  expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)

// test('blogs are returned as json', async () => {

//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// }, 100000)

afterAll(() => {
  mongoose.connection.close()
})