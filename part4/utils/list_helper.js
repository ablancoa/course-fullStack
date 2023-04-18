const dummy = (blogs) => {
  return  Array.isArray(blogs) ? 1 : 0
}

const totalLikes = (blogs) => {
  return blogs.length ===  0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

module.exports = { dummy, totalLikes }