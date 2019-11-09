import React, {useState} from 'react';
import './App.css';

function generateSecretNumber() {
  return Math.round(Math.random() * 100);
}

function App() {

  const [secretNumber, setSecretNumber] = useState(generateSecretNumber());
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  
  console.log('the secret number is: ', secretNumber);
  const didWin = guesses.includes(secretNumber.toString());

  const onChangeGuess = (event) => {
    const {value} = event.target;
    const intValue = parseInt(value);
    if (intValue) {
      setCurrentGuess(intValue.toString());
    } else if (value === '') {
      setCurrentGuess('');
    }
  };

  const onTryGuess = () => {
    if (currentGuess !== '' && !guesses.includes(currentGuess)) {
      setGuesses([currentGuess, ...guesses]);
    }
  };

  const resetGame = () => {
    window.location.reload();
  }

  return (
    <div className="App-Container">
      <h1>React Guessing Game</h1>
      <p>
        try to guess the secret number between <strong>0</strong> and <strong>100</strong>
      </p>
      
      {/* Container for input and button */}
      <div className="input-container">
        <input name="guess" 
              placeholder="What is the number?" 
              onChange={onChangeGuess}
              value={currentGuess}/>
        <button className="btn guess-btn" disabled={currentGuess === ''} onClick={onTryGuess}>Try!</button>
      </div>

      {/* Container for user guesses */}
      <div className="guesses-container">
        <ul>
        { guesses.map(number => <Guess key={number} value={number} secretNumber={secretNumber}/>) }
        </ul>
      </div>
      <div className="reset-controls">
        <button className="btn" onClick={resetGame}>Reset Game</button>
      </div>

      { didWin ? <Winner resetCallback={resetGame}/> : null }

    </div>
  );
}

function Guess({value, secretNumber}) {

  const isTooHigh = value > secretNumber;
  const color = isTooHigh ? 'yellow' : 'white';
  const text = isTooHigh ? 'Too high' : 'Too low';

  return(
    <li style={{color}}>
      {value} - {text}
    </li>
  );

}

function Winner(props) {

  return(
    <div className="winner-container">
      <div className="winner-message">
        <p>Congratulations! 🎉</p>
        <button className="btn" onClick={props.resetCallback}>Play Again</button>
      </div>
    </div>
  )

}

export default App;
