import Course from "./components/Course";
import Total from "./components/Total";

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}



const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 3,
      },
    ],
  }

  return (
    <div>
      <Header course={course.name} />
      <Course parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App