import React from 'react'

export default function Login({handleSubmit, setUsername, setPassword}) {
  return (
    <form onSubmit={handleSubmit}>
      <label style={{display: 'block'}}>
        username
        <input type='text' name='username' onChange={e => setUsername(e.target.value)}/>
      </label>
      <label style={{display: 'block'}}>
        password
        <input type='password' name='password' onChange={e => setPassword(e.target.value)}/>
      </label>
      <button type='submit'>Login</button>
    </form>
  )
}
