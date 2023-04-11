import React from 'react'

export default function Notification({action, name}) {
  return (
    <div className='notification'>
      <h3>{action} {name}</h3>
    </div>
  )
}
