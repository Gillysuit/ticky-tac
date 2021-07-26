const {winCheck} = require('./utils');

module.exports = {

    ticTacToeAI(req, res, next){
        res.locals.nextMove = req.body;

        return next();
    },

    checkWinState(req, res, next){
        const newBoard = res.locals.nextMove;

        res.locals.winner = winCheck(newBoard);

        return next();
    }

}