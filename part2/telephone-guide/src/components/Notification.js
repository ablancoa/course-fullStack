import React from 'react'

export default function Notification({type, message}) {
  if (type !== 'success') {    
    return (
    <div className='notification-fail'>
      <h3>{message}</h3>
    </div>
  )}
  return (
    <div className='notification-success'>
      <h3>{message}</h3>
    </div>
  )
}
