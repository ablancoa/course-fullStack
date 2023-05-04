import React from 'react'

export default function Notification({message, success}) {
  if (success) {
    return (
      <div style={{
        border: '2px solid green',
        padding: 10,
        backgroundColor: 'lightgreen'
      }}>
        {message}
      </div>
    )
  }
  return (
    <div style={{
      border: '2px solid red',
      padding: 10,
      backgroundColor: 'lightcoral'
    }}>
      {message}
    </div>
  )
}
