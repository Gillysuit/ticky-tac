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

app.post('/games/tictactoe/ai', (req, res) => {
    res.status(200).send({});
  });

  //error handling
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});


const port = 8080;

app.listen(port, () => `Server running on port ${port}`);