const matchThree = (space1, space2, space3) => {
    return space1 === space2 && space1 === space3 && space1 !== '';
}

const getAISymbol =(humanSymbol) => {
    const symbols = ["X", "O"];

    return symbols.filter((symbol) => symbol !== humanSymbol).join("");
}

// Returns 'tie', 'X', 'Y', or null
const winCheck = (board) => {
    let winner = null;

    const availableTiles = board.reduce((freeSpaces, row) => { 

        row.forEach(space => {
            if( space === ""){
               freeSpaces += 1; 
            } 
        });
        
        return freeSpaces;
    }, 0);
    

    // Vertical and Horizontal checks
    for(let i = 0; i < 3; i++){
        // horizontal win
        if(matchThree(board[i][0], board[i][1], board[i][2])){
            winner = board[i][0];
        }
        // vertical win
        if(matchThree(board[0][i], board[1][i], board[2][i])){
            winner = board[0][i];
        }
    }

    // Diagonal
    if (matchThree(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
      }
    if (matchThree(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
    }

    // Tie case should be last
    if(winner === null && availableTiles === 0){
        return 'tie';
    }

    return winner;
}

const outComes =  ["X", "O", 'tie'];

const miniMax = (board, curDepth, isMaximizing, gameOptions) => {
    const { aiSymbol, human, pointBoard} = gameOptions;
    // recursive base case
    const result = winCheck(board);
   
    if(result !== null){
        return pointBoard[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
              board[i][j] = aiSymbol;
              let score = miniMax(board, curDepth + 1, false, gameOptions);
              board[i][j] = '';
              bestScore = Math.max(score, bestScore);
            }
          }
        }
        return bestScore;
      } else {
        // human playing;
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
              board[i][j] = human;
              let score = miniMax(board, curDepth + 1, true, gameOptions);
              board[i][j] = '';
              bestScore = Math.min(score, bestScore);
            }
          }
        }
        return bestScore;
      }
}

const nextAIMove = (board, aiSymbol) => {

    let human;

    const pointBoard =  outComes.reduce((obj, outCome) => {
        if(aiSymbol === outCome){
            return {...obj, [outCome]: 1};
        } else if(outCome === 'tie') {
            return {...obj, [outCome]: 0 }
        } else {
            human = outCome;
            return {...obj, [outCome]: -1}
        }
    }, {})

    let bestScore = -Infinity;
    let move;

    const gameOptions = {aiSymbol, human, pointBoard}
    
    for(let i = 0; i < board.length; i ++){
        for(let j = 0; j < board[i].length; j++ ){
            console.log(board[i][j])
            if(board[i][j] === ""){                        
                board[i][j] = aiSymbol;
                
                let score = miniMax(board, 0, false, gameOptions)
                board[i][j] = '';
                if(score > bestScore) {
                    bestScore =  score;
                    move = {row: i, place: j};
                }
            }
        }
    }

    board[move.row][move.place] = aiSymbol;
    
    return board;
   
};

module.exports = { winCheck : winCheck, getAISymbol: getAISymbol, nextAIMove: nextAIMove}