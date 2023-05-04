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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const user = {
      username: username,
      password: password
    }

    try {
     const loggedUser = await loginService.login(user);
     setUser(loggedUser)
     window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
     console.log(loggedUser)
     setUsername('')
     setPassword('')
    } catch (error) {
      console.log(error)
    }

  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
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
    <div>
    <p>{user.username} is logged in</p>
    <button onClick={handleLogout}>logout</button>
    </div>

    <h2>blogs</h2>
    {blogs.map(blog =>(
      <Blog key={blog.id} blog={blog} />
    )
    )}
  </div>)
}

export default App