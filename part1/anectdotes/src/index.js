import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

const AnecdotesWithMostVotes = ({anecdotes, votes}) => {
  const higherVote = Math.max(...votes);
  const index = votes.findIndex(element => element === higherVote)

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[index]}
      <p>has {votes[index]} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))


  const handleClick = () => {
    let indice = Math.floor(Math.random()*props.anecdotes.length)
    setSelected(indice)
  }

  const handleClickVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
        <p>has {votes[selected]} votes</p>
        <div>
          <button onClick={handleClickVote}>vote</button>
          <button onClick={handleClick}>next anecdote</button>
        </div>
      </div>
      <AnecdotesWithMostVotes anecdotes={props.anecdotes} votes={votes} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>
);
