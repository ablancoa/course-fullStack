import React, {useRef} from 'react'
import blogServices from '../services/blogs'

export default function AddBlogs({user, setBlogs, blogs, successMessage, errorsMessage}) {

  const formRef = useRef()

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: formRef.current.title.value,
        name: user.name,
        username: user.username,
        url: formRef.current.url.value,
      }
      const response = await blogServices.create(blog, user.token)
      setBlogs([...blogs].concat({...response, name: user.name}))
      formRef.current.reset()
      successMessage('Blog added')
    } catch (error) {
      errorsMessage('Error adding blog')
    }
  }

  return (
    <form onSubmit={handleAddBlog} ref={formRef}>
      <label style={{display: 'block'}}>
        Title:
        <input type="text" name="title" />
      </label>
      <label style={{display: 'block'}}>
        URL:
        <input type="text" name="url" />
      </label>
      <button type='submit'>Create</button>
    </form>
  )
}
