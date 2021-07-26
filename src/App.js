import {useEffect, useState} from 'react';
import axios from 'axios';
import './game-styles.css';

function App() {
  const serverUrl = "http://localhost:8080/games/tictactoe";

  const [winner, setWinner] = useState(null);
  const [rawBoard, setRawBoard] = useState([]);
  const [playerSymbol, setPlayerSymbol] = useState('');
  const [gameBoard, setGameBoard] = useState(null);

  useEffect(()=> {

    const handleClick = (event) => {
      event.preventDefault();

      if(event.target.innerHTML === "" && !winner){
      const symbolPlace =  event.target.value;

      if(rawBoard && rawBoard.length){
        const [row, placement] =  symbolPlace.split(",").map((index) => parseInt(index));
        const tempBoard  = [...rawBoard];
        tempBoard[row][placement] = playerSymbol;
        setRawBoard(tempBoard);
      };
      
      const jsonData =  JSON.stringify({board: rawBoard, playerSymbol});
  
      
      axios.post(`${serverUrl}/ai`, jsonData, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
      })
      .then((resp) => {

        if(resp.data.winner !== null){
          setWinner(resp.data.winner)
          if(resp.data.winner !== playerSymbol){
            setRawBoard(resp.data.newBoard);
          }
        } else {
        setRawBoard(resp.data.newBoard);
        }
      })
      
      event.target.innerHTML = playerSymbol;
      }
    };

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

    setGameBoard(gameView(rawBoard))
  }, [rawBoard, playerSymbol, winner])

  const fetchBoard = () => {
    axios.get(serverUrl)
    .then((resp) =>{
      setRawBoard(resp.data);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // Fetch board on component did mount
  useEffect(fetchBoard, []);


  const handleChoice = (event) => {
    event.preventDefault();
    setPlayerSymbol(event.target.value);
  }

  const ChooseSymbol = () => {
    return(
      <div> 
        <h3 class="winText">Choose your symbol</h3>
        <div className="choices">
          <button className="symbols O" onClick={handleChoice} value="O">O</button>
          <button className="symbols X" onClick={handleChoice} value="X">X</button>
        </div>
      </div>
    )
  }

  const resetGame = () => {
    fetchBoard();
    setWinner(null);
    setPlayerSymbol('');
  }

  const WinnerBanner = () => {
    if(winner !== null){
      let winText;
      if(winner === 'tie'){
        winText = "It's a Tie!"
      } else {
        winText = `${winner} wins!`
      }
      return(
        <div>
          <h2 class="winText">{winText}</h2>
          <buttton className="reset" onClick={resetGame}>New Game</buttton>
        </div>
      )
    }
    return null;
  }

  return (
    <div className="App">
      <div className="gameView">
      <h1 className="title" >Tic-Tac-Toe</h1>
         {!playerSymbol && <ChooseSymbol />}
         {playerSymbol && gameBoard }
         {winner && <WinnerBanner />}
      </div>
    </div>
  );
}

export default App;
