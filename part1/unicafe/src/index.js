import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

const Button = ({action, text}) => <button onClick={action}>{text}</button>
const StaticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Feedback = ({handleClickGood, handleClickNeutral, handleClickBad}) => {
  return (
    <>
      <h1>feedback</h1>
      <Button action={handleClickGood} text='good' />
      <Button action={handleClickNeutral} text='neutral' />
      <Button action={handleClickBad} text='bad' />
    </>
  )
}

const Statics = ({good, neutral, bad, value}) => {

  if (!value.length) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  const average = value.reduce((a,b) => a + b, 0)
  const positive = (good/value.length)*100

  return (
    <>
      <h1>statics</h1>
      <table>
        <StaticLine text='good' value={good} />
        <StaticLine text='neutral' value={neutral} />
        <StaticLine text='bad' value={bad} />
        <StaticLine text='all' value={value.length} />
        <StaticLine text='average' value={average/value.length} />
        <StaticLine text='positive' value={`${positive}%`} />
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [value, setValue] = useState([]);

  const handleClickGood = () => {
    setGood(good+1);
    setValue(value.concat(1))
  }
  const handleClickNeutral = () => {
    setNeutral(neutral+1)
    setValue(value.concat(0))
  }
  const handleClickBad = () => {
    setBad(bad+1)
    setValue(value.concat(-1))
  }

  
  return (
    <div>
      <Feedback handleClickGood={handleClickGood} handleClickNeutral={handleClickNeutral} handleClickBad={handleClickBad} />
      <Statics good={good} neutral={neutral} bad={bad} value={value}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
