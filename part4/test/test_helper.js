const Blog = require('../models/blog')
const User = require('../models/user')

const blogs = [
  {
    title: 'React patterns',
    author: '64528b42a4b1144aec06770c',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: '64528b42a4b1144aec06770c',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: '64528b42a4b1144aec06770c',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: '64528b42a4b1144aec06770c',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: '64528b42a4b1144aec06770c',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: '64528b42a4b1144aec06770c',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

const users = [
  {
    username: 'test',
    name: 'test',
    password: 'test'
  }
]


const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Will remove soon',
    author: '64528b42a4b1144aec06770c',
    url: 'url',
    likes: 2
  })
  await blog.save()
  await Blog.deleteOne({ _id: blog._id })

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blog = await Blog.find({})
  return blog.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = { blogs, nonExistingId, blogsInDb, usersInDb }