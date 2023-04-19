const lodash = require('lodash')

const dummy = (blogs) => {
  return  Array.isArray(blogs) ? 1 : 0
}

const totalLikes = (blogs) => {
  return blogs.length ===  0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return null
  }
  else {
    const favorite = blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr)
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }

}

const mostBlogs = (blogs, key) => {
  const prueba = lodash.countBy(blogs, key.toString())
  const newArrayWriters = Object.entries(prueba).map(writer => {
    return {
      author: writer[0],
      blogs: writer[1]
    }
  })
  return lodash.orderBy(newArrayWriters, ['blogs'], ['desc'])[0]
}


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }