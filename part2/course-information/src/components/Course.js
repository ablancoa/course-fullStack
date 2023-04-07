import React from 'react';

const Part = ({part, exercises}) => {
  return (
    <p>{part} {exercises}</p>
  )
}


const Course = ({parts}) => {
  return parts.map(part => <Part part={part.name} exercises={part.exercises} key={part
  .name}/>);
}

export default Course;