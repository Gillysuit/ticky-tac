const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));


app.use(cors());

app.get('/games/tictactoe',  (req, res) => {
    const gameBoard = [['', '', ''],['', '', ''],['', '', '']];
   
    res.json(gameBoard);  
  });


const port = 8080;

app.listen(port, () => `Server running on port ${port}`);