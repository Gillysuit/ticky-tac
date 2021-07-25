import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const serverUrl = "http://localhost:8080/games/tictactoe";

  const fetchBoard = () => {
    axios.get(serverUrl)
    .then((resp) =>{
      console.log(resp.data);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(fetchBoard, []);


  return (
    <div className="App">
     hello
    </div>
  );
}

export default App;
