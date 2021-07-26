const { winCheck, getAISymbol, nextAIMove } = require('./utils');

module.exports = {
  ticTacToeAI(req, res, next) {
    const AISymbol = getAISymbol(req.body.playerSymbol);
    const board = req.body.board;

    if (!winCheck(board)) {
      const alteredBoard = nextAIMove(board, AISymbol);
      res.locals.nextMove = alteredBoard;
    } else {
      res.locals.nextMove = board;
    }

    return next();
  },

  checkWinState(req, res, next) {
    const newBoard = res.locals.nextMove;

    res.locals.winner = winCheck(newBoard);

    return next();
  }
};
