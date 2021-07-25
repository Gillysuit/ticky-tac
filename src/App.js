import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const serverUrl = "http://localhost:8080/games/tictactoe";

  const [gameBoard, setGameBoard] = useState(null);

  const fetchBoard = () => {
    axios.get(serverUrl)
    .then((resp) =>{
      setGameBoard(gameView(resp.data))
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const jsonData = JSON.stringify([]);

  const handleClick = () => {
    axios.post(`${serverUrl}/ai`, jsonData, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => {

      console.log(resp.data)
      } 
    )
    
  }

  const gameView = (gameBoard) => {
    const finalView = [];
  
    gameBoard.forEach((row, rowIndex) => {
      const newRow  = [];
  
      row.forEach((symbols, rowPlace) =>{ 
       
          newRow.push(<button value={`${rowIndex}, ${rowPlace}`} onClick={handleClick} className={['symbols', symbols ? symbols : ''].join(" ")}>{symbols}</button>)
      });
  
      finalView.push(<div className={"rowWrapper"}> {newRow} </div>);
    });
    return [<div className="gridWrapper">{finalView}</div>];
  }

  useEffect(fetchBoard, []);


  return (
    <div className="App">
     hello
     {gameBoard}
    </div>
  );
}

export default App;
