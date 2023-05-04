import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import AddBlogs from './components/AddBlogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

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

  const successMessage = (newMessage) => {
    setMessage({message: newMessage, success: true})
    setTimeout(() => {
      setMessage(null)
    },3000)
  }
  const errorsMessage = (newMessage) => {
    setMessage({message: newMessage, success: false})
    setTimeout(() => {
      setMessage(null)
    },3000)
  }

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
     successMessage('logged in successfully')
     setUsername('')
     setPassword('')
    } catch (error) {
      errorsMessage(`wrong credentials`)
    }

  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    successMessage('logged out successfully')
  }

  if (user === null) {
    return (
      <>
      {message !== null ?  <Notification message={message.message} success={message.success} /> : null}
      <Login 
        setUser={setUser} 
        handleSubmit={handleSubmit} 
        setPassword={setPassword} 
        setUsername={setUsername}
        />
      </>
    )
  }

  return (
  <div>
    <div>
    <p>{user.username} is logged in</p>
    <button onClick={handleLogout}>logout</button>
    </div>
    {message !== null ?  <Notification message={message.message} success={message.success} /> : null}
    <h2>Create blogs</h2>
    <AddBlogs user={user} setBlogs={setBlogs} blogs={blogs} successMessage={successMessage} errorsMessage={errorsMessage} />
    <h2>blogs</h2>
    {blogs.map(blog =>(
      <Blog key={blog.id} blog={blog} />
    )
    )}
  </div>)
}

export default App