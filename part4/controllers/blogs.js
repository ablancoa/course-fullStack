const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('author', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})


blogRouter.post('/',middleware.userExtractor , async (request, response) => {
  const body = request.body
  const user = request.user

  const authorPost = await User.findById(user.id)

  const newBlogToAdd = new Blog ({
    title: body.title,
    author: authorPost._id,
    url: body.url,
    likes: body.likes || 0
  })

  const result = await newBlogToAdd.save()
  authorPost.blogs = authorPost.blogs.concat(newBlogToAdd._id)
  await authorPost.save()
  response.json(result)
})

blogRouter.delete('/:id',middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  if(blog.author.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
  }

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