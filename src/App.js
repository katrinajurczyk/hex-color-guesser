import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [color, setColor] = useState("");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState();

  const Result = {
    CORRECT: 'correct',
    WRONG: 'wrong',
  }

  const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
    return "#" + randomColor.padStart(6, '0');
  }

  const selectColors = () => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers([actualColor, getRandomColor(), getRandomColor()].sort(() => 0.5 - Math.random()));
  }

  useEffect(() => {
    selectColors();
  }, [])

  const handleButtonClick = (answer) => {
    if (answer === color) {
      setResult(Result.CORRECT);
      selectColors();
    } else {
      setResult(Result.WRONG);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Guess what color this is.
        </p>
        <div className="color-box" style={{background: color}}></div>
        <div className="flex-container">
          {answers.map(answer => (
            <button className="hex-button" key={answer} onClick={() => handleButtonClick(answer)}>{answer}</button>
          ))}
        </div>
        { result === Result.CORRECT && <p className="correct-guess">Correct!</p>}
        { result === Result.WRONG && <p className="wrong-guess">Try again.</p>}
      </header>
    </div>
  );
}

export default App;
