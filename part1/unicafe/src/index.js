import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

const Button = ({action, text}) => <button onClick={action}>{text}</button>

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

const Statics = ({good, neutral, bad}) => {
  return (
    <>
      <h1>statics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good+1)
  }
  const handleClickNeutral = () => {
    setNeutral(neutral+1)
  }
  const handleClickBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <Feedback handleClickGood={handleClickGood} handleClickNeutral={handleClickNeutral} handleClickBad={handleClickBad} />
      <Statics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
