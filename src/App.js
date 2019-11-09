import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App-Container">
      <h1>React Guessing Game</h1>
      <p>
        Tente adivinhar o número secreto.
      </p>
      <input name="guess" placeholder="Qual o número secreto?"/>
    </div>
  );
}

export default App;
