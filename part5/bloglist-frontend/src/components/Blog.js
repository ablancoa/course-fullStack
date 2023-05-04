const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author.name || blog.name}
  </div>  
)

export default Blog