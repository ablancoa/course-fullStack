const Total = ({parts}) => {
  const total = parts.reduce((a,b) => a + b.exercises,0)
  return (
    <p><b>total of { total } exercices</b></p>
  )
}

export default Total;