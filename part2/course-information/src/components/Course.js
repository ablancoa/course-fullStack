import React from 'react';
import Part from './Part';

const Course = ({parts}) => {
  return parts.map(part => <Part part={part.name} exercises={part.exercises} key={part
  .name}/>);
}

export default Course;