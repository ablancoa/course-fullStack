const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('author', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  console.log('body: ',request.body)
  const authorPost = await User.findById('6446fce9ba859ab396375036')

  const newBlogToAdd = new Blog ({
    title: request.body.title,
    author: authorPost._id,
    url: request.body.url,
    likes: request.body.likes || 0
  })

  const result = await newBlogToAdd.save()
  authorPost.blogs = authorPost.blogs.concat(newBlogToAdd._id)
  await authorPost.save()
  response.json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(blog)
})

module.exports = blogRouter