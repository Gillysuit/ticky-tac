const matchThree = (space1, space2, space3) => {
    return space1 === space2 && space1 === space3 && space1 !== '';
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

module.exports = { winCheck : winCheck}