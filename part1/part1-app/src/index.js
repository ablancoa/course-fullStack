import React from 'react'
import ReactDOM from 'react-dom/client'

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({part, exercises}) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Content = ({parts}) => {
  return parts.map(part => <Part part={part.name} exercises={part.exercises} key={part
  .name}/>);
}

const Total = ({parts}) => {
  const [one, two, three] = parts
  return (
    <p>Number of exercises { one.exercises + two.exercises + three.exercises }</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
