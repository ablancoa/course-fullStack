import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService
    .getAll()
    .then(initialBlogs => setBlogs(initialBlogs))
    .catch(error => console.log(error))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const user = {
      username: username,
      password: password
    }

    try {
     const loggedUser = await loginService.login(user);
     setUser(loggedUser)
     console.log(loggedUser)
     setUsername('')
     setPassword('')
    } catch (error) {
      console.log(error)
    }

  }

  if (user === null) {
    return (
      <Login 
        setUser={setUser} 
        handleSubmit={handleSubmit} 
        setPassword={setPassword} 
        setUsername={setUsername}
      />
    )
  }

  return (
  <div>
    <p>{user.username} is logged in</p>
    <h2>blogs</h2>
    {blogs.map(blog =>(
      <Blog key={blog.id} blog={blog} />
    )
    )}
  </div>)
}

export default App