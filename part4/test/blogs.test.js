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

test('blogs are identified by id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'XXXXXXXXXXX',
    url: 'Test url',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('Test blog')
})

test('blog without likes is set to 0', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'XXXXXXXXXXX',
    url: 'Test url'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const likes = response.body.map(r => r.likes)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(likes[likes.length - 1]).toBe(0)
})

test('blog without title and url is not added', async () => {
  const newBlog = {
    author: 'XXXXXXXXXXX',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})